const { create } = require("framer-motion/m");
const conn = require("../../../Config/db");
const { get } = require("../Routes/auth.routes");

// Check Email
const checkEmail = async (email) => {
  const [[query]] = await conn.query(
    `select * from tbl_user where email = ? AND is_active = 1 and is_deleted = 0`,
    [email],
  );

  return query;
};

// Check Phone
const checkPhone = async (phone) => {
  const [[query]] = await conn.query(
    `select * from tbl_user where concat(country_code, phone) = ? and is_deleted = 0`,
    [phone],
  );

  return query;
};

// Check Social Id
const checkSocialId = async (social_id) => {
  const [[query]] = await conn.query(
    `select * from tbl_user where social_id = ? and is_deleted = 0`,
    [social_id],
  );
  return query;
};

// Check OTP via Phone
const createOtpViaPhone = async (country_code, phone, otp, purpose) => {
  const [query] = await conn.query(
    `Insert into tbl_otp(country_code, phone, otp, purpose) values(?, ?, ?, ?)`,
    [country_code, phone, otp, purpose],
  );

  return query.insertId;
};

// Create OTP via Email
const createOtpViaEmail = async (email, otp, purpose) => {
  const [query] = await conn.query(
    `Insert into tbl_otp(email, otp, purpose) values(?, ?, ?)`,
    [email, otp, purpose],
  );

  return query.insertId;
};

// Check OTP
const checkOtpViaPhone = async (country_code, phone, purpose) => {
  console.log(country_code, phone, purpose);
  const [query] = await conn.query(
    `select * from tbl_otp where country_code=? and phone=? and is_used=0 and purpose=? order by updated_at desc limit 1`,
    [country_code, phone, purpose],
  );

  return query[0];
};

// Check OTP
const checkOtpViaEmail = async (email, purpose) => {
  const [query] = await conn.query(
    `select * from tbl_otp where email=? and is_used=0 and purpose=? order by updated_at desc limit 1`,
    [email, purpose],
  );

  return query[0];
};

// Check verified OTP via Email
const checkVerifiedOtpViaEmail = async (email, purpose) => {
  const [query] = await conn.query(
    `select * from tbl_otp where email=? and is_used=1 and purpose=? order by updated_at desc limit 1`,
    [email, purpose],
  );

  return query[0];
};

// Check User Verification
const checkUserVerification = async (country_code, phone, purpose) => {
  const [query] = await conn.query(
    `select * from tbl_otp where country_code=? and phone=? and purpose=? and is_used=1 order by updated_at desc limit 1`,
    [country_code, phone, purpose],
  );
  return query[0];
};

// Update OTP Status
const updateOtpStatus = async (otp_id) => {
  const [query] = await conn.query(
    `update tbl_otp set is_used=1 where otp_id=?`,
    [otp_id],
  );
  return query;
};

// Get User
const getUser = async (field) => {
  const [[query]] = await conn.query(
    `select * from tbl_user where (user_id=? or concat(country_code, phone) = ?  or email = ? or social_id = ?) and (is_deleted = 0 and is_active = 1) limit 1`,
    [field, field, field, field],
  );

  return query;
};

// Signup Repository
const signUp = async (
  name,
  email,
  country_code,
  phone,
  password,
  login_type,
  social_id,
) => {
  try {
    const insertObject =
      login_type === "s"
        ? {
            name,
            email,
            country_code,
            phone,
            password,
            login_type,
          }
        : {
            email,
            social_id,
            login_type,
          };

    const [query] = await conn.query(
      `Insert into tbl_user SET ?`,
      insertObject,
    );

    const user = await getUser(query.insertId);
    return {
      success: true,
      key: "userCreated",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        country_code: user.country_code,
        phone: user.phone,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Set Profile
const setProfile = async (user_id, profile_pic, steps) => {
  try {
    const object = profile_pic
      ? {
          profile_pic,
          steps,
        }
      : {
          steps,
        };
    const [query] = await conn.query(`update tbl_user set ? where user_id=?`, [
      object,
      user_id,
    ]);
    return { success: true, key: "profileUpdated" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Save User Device Details
const saveUserDeviceDetails = async (device_details) => {
  try {
    const object = {
      user_id: device_details.user_id,
      token: device_details.token,
      device_token: device_details.device_token,
      device_type: device_details.device_type,
      device_name: device_details.device_name,
      device_model: device_details.device_model,
      os_version: device_details.os_version,
      uuid: device_details.uuid,
      ip: device_details.ip,
    };

    const [query] = await conn.query(`insert into tbl_user_device set ?`, [
      object,
    ]);

    return { success: true, key: "deviceDetailsSaved" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Add Address
const addAddress = async (data) => {
  try {
    console.log(data);
    const [query] = await conn.query(`insert into tbl_address set ?`, [data]);

    if (query.affectedRows > 0) return { success: true, key: "addressAdded" };
    return { success: false, key: "failedToAddAddress" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Check city, state, country is exist or not
const checkCityStateCountry = async (city_id) => {
  try {
    const [[query]] = await conn.query(
      `select c.city_id, s.state_id, co.country_id from tbl_city c join tbl_state s on c.state_id = s.state_id join tbl_country co on s.country_id = co.country_id where c.city_id = ? and c.is_deleted = 0 and s.is_deleted = 0 and co.is_deleted = 0`,
      [city_id],
    );
    return query;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Update Address Step  
const updateAddressStep = async (user_id, steps) => {
  try {
    const [query] = await conn.query(
      `update tbl_user set steps=? where user_id=?`,
      [steps, user_id],
    );
    if (query.affectedRows > 0)
      return { success: true, key: "addressStepUpdated" };
    return { success: false, key: "failedToUpdateAddressStep" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Get Address
const getAddress = async (user_id) => {
  try {
    const [[query]] = await conn.query(
      `select * from tbl_address join tbl_city on tbl_address.city_id = tbl_city.city_id join tbl_state on tbl_city.state_id = tbl_state.state_id join tbl_country on tbl_state.country_id = tbl_country.country_id where tbl_address.user_id=? and tbl_address.is_deleted=0 and tbl_address.is_default=1 and tbl_city.is_deleted=0 and tbl_state.is_deleted=0 and tbl_country.is_deleted=0`,
      [user_id],
    );
    return query;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Logout
const logout = async (token, user_id) => {
  try {
    const [query] = await conn.query(
      `update tbl_user_device set is_active=0 where user_id=? and token=? and is_active=1`,
      [user_id, token],
    );
    if (query.affectedRows > 0) {
      return { success: true, key: "logoutSuccess" };
    }
    return { success: false, key: "logoutFailed" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Check Token
const checkToken = async (token) => {
  try {
    const [[isTokenLoggedOut]] = await conn.query(
      `select 1 from tbl_user_device where token = ? and is_active = 1`,
      [token],
    );
    return isTokenLoggedOut;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Update Password
const changePassword = async (user_id, new_password) => {
  try {
    const [query] = await conn.query(
      `update tbl_user set password = ? where user_id = ?`,
      [new_password, user_id],
    );
    if (query.affectedRows > 0)
      return { success: true, key: "passwordChanged" };
    return { success: false, key: "failedToupdate" };
  } catch (error) {
    console.error(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

module.exports = {
  checkEmail,
  checkPhone,
  checkSocialId,
  createOtpViaPhone,
  createOtpViaEmail,
  checkUserVerification,
  checkOtpViaPhone,
  checkOtpViaEmail,
  checkVerifiedOtpViaEmail,
  updateOtpStatus,
  signUp,
  setProfile,
  saveUserDeviceDetails,
  getUser,
  addAddress,
  checkCityStateCountry,
  updateAddressStep,
  getAddress,
  logout,
  checkToken,
  changePassword,
};
