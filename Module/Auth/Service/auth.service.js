const common = require("../../../Common/common");
const repository = require("../Repository/auth.repository");
const md5 = require("md5");
const constant = require("../../../Common/Constant/constant");

// Generate OTP
const generateOtp = async (data) => {
  try {
    const { country_code = null, phone = null, purpose } = data;
    const otp = Math.floor(1000 + Math.random() * 9999);

    if (purpose === "s") {
      const isPhoneExist = await repository.checkPhone(country_code + phone);
      if (isPhoneExist) return { sucess: false, key: "phoneAlreadyExist" };
    } else {
      const isPhoneExist = await repository.checkPhone(country_code + phone);
      console.log("are bhai rehne de", isPhoneExist, country_code, phone);
      if (!isPhoneExist) return { sucess: false, key: "userNotFound" };
    }
    const checkOtp = await repository.checkOtp(country_code, phone, purpose);
    if (checkOtp) {
      if (checkOtp.updated_at > new Date(Date.now() - 30 * 1000))
        return { sucess: false, key: "pleaseHold" };
    }
    await repository.createOtpViaPhone(country_code, phone, otp, purpose);
    return { sucess: true, key: "otpSent" };
  } catch (error) {
    console.log(error);
    return { sucess: false, key: "somethingWentWrong" };
  }
};

// Check Credential
const checkCredential = async (data) => {
  try {
    const { email, country_code, phone, social_id } = data;
    let errors = {
      success: false,
      error: {},
    };

    if (phone) {
      const isPhoneExist = await repository.checkPhone(country_code + phone);
      if (isPhoneExist) errors.error.phone = "phoneAlreadyExist";
    } else if (social_id) {
      const isSocialIdExist = await repository.checkSocialId(social_id);
      if (isSocialIdExist) errors.error.social_id = "socialIdAlreadyExist";
    }

    const isEmailExist = await repository.checkEmail(email);
    if (isEmailExist) errors.error.email = "emailAlreadyExist";
    console.log(isEmailExist, errors, email);
    if (Object.keys(errors.error).length > 0) {
      return { sucess: false, key: "failed", errors: errors.error };
    }

    return { sucess: true, key: "success" };
  } catch (error) {
    console.log(error);
    return { sucess: false, key: "somethingWentWrong" };
  }
};

// Validate OTP
const validateOtp = async (data) => {
  try {
    const { country_code = null, phone = null, otp, purpose } = data;

    const isOtpRowExist = await repository.checkOtp(
      country_code,
      phone,
      purpose,
    );
    console.log(isOtpRowExist);
    if (!isOtpRowExist) return { sucess: false, key: "otpNotFound" };
    const FIVE_MINUTES = 5 * 60 * 1000;
    const isExpired =
      Date.now() - new Date(isOtpRowExist.updated_at).getTime() > FIVE_MINUTES;
    if (isExpired) return { sucess: false, key: "otpExpired" };
    if (isOtpRowExist.otp !== otp) return { sucess: false, key: "invalidOtp" };

    const updateOtpStatus = await repository.updateOtpStatus(
      isOtpRowExist.otp_id,
    );

    if (updateOtpStatus.changedRows === 0)
      return { sucess: false, key: "failedToUpdateOtp" };
    return { sucess: true, key: "otpVerified" };
  } catch (error) {
    console.log(error);
    return { sucess: false, key: "somethingWentWrong" };
  }
};

// Sign Up
const signUp = async (data) => {
  try {
    const {
      name,
      email,
      country_code,
      phone,
      password,
      confirm_password,
      login_type,
      social_id,
      device_token,
      device_type,
      device_name,
      device_model,
      os_version,
      uuid,
      ip,
    } = data;

    if (password !== confirm_password)
      return { sucess: false, key: "passwordMismatch" };

    const checkCredentialResult =
      login_type === "s"
        ? await checkCredential({ email, country_code, phone })
        : await checkCredential({ email, social_id });
    // console.log(checkCredentialResult)
    if (!checkCredentialResult.sucess)
      return {
        sucess: false,
        key: "credentialCheckFailed",
        errors: checkCredentialResult.errors,
      };

    const signUpResult = await repository.signUp(
      name,
      email,
      country_code,
      phone,
      md5(password),
      login_type,
      social_id,
    );
    if (signUpResult.success) {
      const tokenData = {
        user_id: signUpResult.user.user_id,
        email: signUpResult.user.email,
      };

      // Generate Token
      const token = common.generateToken(tokenData);
      const deviceData = {
        user_id: signUpResult.user.user_id,
        token: token.token,
        device_token,
        device_type,
        device_name,
        device_model,
        os_version,
        uuid,
        ip,
      };

      // Attach Token to User Object
      signUpResult.user.token = token.token;

      // Save Device Details and Token
      const updateDeviceTokenResult =
        await repository.saveUserDeviceDetails(deviceData);
      if (!updateDeviceTokenResult.success)
        return { success: false, key: "deviceDetailsSaveFailed" };

      return { success: true, key: "userCreated", user: signUpResult.user };
    } else {
      return { success: false, key: "userCreationFailed" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Set Profile
const setProfile = async (data, loggedInUser) => {
  try {
    const { profile_pic, steps } = data;
    const user_id = loggedInUser.user_id;
    let user = await repository.getUser(user_id);
    if (!user) return { success: false, key: "userNotFound" };

    const result = await repository.setProfile(user_id, profile_pic, steps);
    console.log(result);
    user = await repository.getUser(user_id);
    userData =
      user.login_type === "s"
        ? {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            country_code: user.country_code,
            phone: user.phone,
            profile_pic: user.profile_pic,
            steps: user.steps,
          }
        : {
            user_id: user.user_id,
            email: user.email,
            social_id: user.social_id,
          };
    console.log(userData);
    if (result.success)
      return { success: true, key: "profileUpdated", userData };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Set Address
const setAddress = async (data, loggedInUser) => {
  try {
    const {
      steps,
      name,
      company,
      address1,
      address2,
      city_id,
      postal_code,
      latitude,
      longitude,
      is_default = 1,
    } = data;
    const user_id = loggedInUser.user_id;
    let user = await repository.getUser(user_id);
    if (!user) return { success: false, key: "userNotFound" };

    const is_cityExist = await repository.checkCityStateCountry(city_id);
    if (!is_cityExist) return { success: false, key: is_cityExist.key };

    const updateAddressStep = await repository.updateAddressStep(
      user_id,
      steps,
    );
    if (!updateAddressStep.success)
      return { success: false, key: "addressStepUpdateFailed" };

    const result = await repository.addAddress({
      user_id,
      name,
      company,
      address1,
      address2,
      city_id,
      postal_code,
      latitude,
      longitude,
      is_default,
    });
    if (!result.success) return { success: false, key: "addressUpdateFailed" };
    user = await repository.getUser(user_id);
    let address = await repository.getAddress(user_id);
    // const address = await repository.getAddress(user.user_id)

    const userData =
      user.login_type === "s"
        ? {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            country_code: user.country_code,
            phone: user.phone,
            profile_pic: user.profile_pic,
            steps: user.steps,
            address: {
              address_id: address.address_id,
              name: address.name,
              company: address.company,
              address1: address.address1,
              address2: address.address2,
              city: address.city_name,
              state: address.state_name,
              country: address.country_name,
              postal_code: address.postal_code,
              latitude: address.latitude,
              longitude: address.longitude,
            },
          }
        : {
            user_id: user.user_id,
            email: user.email,
            social_id: user.social_id,
            profile_pic: user.profile_pic,
            steps: user.steps,
            address: {
              address_id: address.address_id,
              name: address.name,
              company: address.company,
              address1: address.address1,
              address2: address.address2,
              city: address.city_name,
              state: address.state_name,
              country: address.country_name,
              postal_code: address.postal_code,
              latitude: address.latitude,
              longitude: address.longitude,
            },
          };
    console.log(userData);
    return { success: true, key: "addressUpdated", userData };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Sign In
const signIn = async (data) => {
  try {
    let user;
    if (data.email) {
      user = await repository.getUser(data.email);
    } else if (data.social_id) {
      user = await repository.getUser(data.social_id);
    }
    if (!user)
      return {
        success: false,
        code: constant.VALIDATION_ERROR,
        key: "invalidEmail",
      };

    // is passowrd or social id is correct
    const result =
      user.login_type === "s"
        ? md5(data.password) === user.password
        : data.social_id === user.social_id;
    if (!result)
      return {
        success: false,
        code: constant.VALIDATION_ERROR,
        key: "invalidPassword",
      };

    // Generate Token
    const tokenData = {
      user_id: user.user_id,
      email: user.email,
    };
    const token = common.generateToken(tokenData);

    // Prepare Device Data
    const deviceData = {
      user_id: user.user_id,
      token: token.token,
      device_token: data.device_token,
      device_type: data.device_type,
      device_name: data.device_name,
      device_model: data.device_model,
      os_version: data.os_version,
      uuid: data.uuid,
      ip: data.ip,
    };
    // Attach Token to User Object
    // user.token = token.token

    // Save Device Details and Token
    const updateDeviceTokenResult =
      await repository.saveUserDeviceDetails(deviceData);
    if (!updateDeviceTokenResult.success)
      return {
        success: false,
        code: constant.ERROR,
        key: "deviceDetailsSaveFailed",
      };

    switch (user.steps) {
      case 1:
        user = {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          country_code: user.country_code,
          phone: user.phone,
          steps: user.steps,
          token: token.token,
        };
        return {
          success: true,
          code: constant.PROFILE_PICTURE_PENDING,
          key: "profileSetUpPending",
          user,
        };
      case 2:
        user = {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          country_code: user.country_code,
          phone: user.phone,
          profile_pic: user.profile_pic,
          steps: user.steps,
          token: token.token,
        };
        return {
          success: true,
          code: constant.ADDRESS_PENDING,
          key: "addressSetUpPending",
          user,
        };

      case 3:
        user = {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          country_code: user.country_code,
          phone: user.phone,
          profile_pic: user.profile_pic,
          steps: user.steps,
          token: token.token,
        };

        const address = await repository.getAddress(user.user_id);
        user.address = {
          address_id: address.address_id,
          name: address.name,
          company: address.company,
          address1: address.address1,
          address2: address.address2,
          city: address.city_name,
          state: address.state_name,
          country: address.country_name,
          postal_code: address.postal_code,
          latitude: address.latitude,
          longitude: address.longitude,
        };

        return {
          success: true,
          code: constant.SUCCESS,
          key: "signInSuccess",
          user,
        };
    }
  } catch (error) {
    console.log(error);
    return { success: false, code: constant.ERROR, key: "somethingWentWrong" };
  }
};

// Logout
const logout = async (token, user_id) => {
  try {
    let user = await repository.getUser(user_id);
    if (!user) return { success: false, key: "userNotFound" };

    const result = await repository.logout(token, user_id);
    console.log(result);
    if (!result.success) return { success: false, key: "logoutFailed" };
    return { success: true, key: "logoutSuccess" };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Forgot Password
const forgotPassword = async (email) => {
  try {
    const query = await repository.getUser(email);
    if (!query) return { success: false, key: "emailNotRegistered" };
    if (query.login_type !== "s")
      return { success: false, key: "invalidRequest" };
    const otp = await generateOtp({
      country_code: query.country_code,
      phone: query.phone,
      purpose: "f",
    });
    console.log(otp);
    if (!otp) return { success: false, key: otp.key };

    return { success: true, key: otp.key };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Update Password
const updatePassword = async (data, loggedInUser) => {
  try {
    const { current_password, new_password, confirm_password } = data;
    if (new_password !== confirm_password)
      return { success: false, key: "passwordMismatch" };

    let user = await repository.getUser(loggedInUser.user_id);
    if (!user) return { success: false, key: "userNotFound" };
    if (user.login_type !== "s")
      return { success: false, key: "invalidRequest" };
    if (user.password !== md5(current_password))
      return { success: false, key: "invalidCurrentPassword" };

    const result = await repository.updatePassword(
      user.user_id,
      md5(new_password),
    );
    if (!result.success) return { success: false, key: "passwordChangeFailed" };
    return { success: true, key: "passwordChangeSuccess" };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

module.exports = {
  generateOtp,
  checkCredential,
  validateOtp,
  signUp,
  setProfile,
  setAddress,
  signIn,
  logout,
  forgotPassword,
  updatePassword,
};
