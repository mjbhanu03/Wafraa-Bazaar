const validateJoi = require('../Validator/auth.validator')
const common = require('../../../Common/common')
const {sendResponse} = require('../../../Common/Middleware/middleware')
const responseCode = require('../../../Common/Constant/constant')
const service = require('../Service/auth.service')

// Generate OTP
const generateOtp = async (req, res) =>{
  try {
  
    // const validation = common.validate(validateJoi.generateOtpSchema(req.body))
    // const {email, country_code, phone, purpose} = req.body
    const result = await service.generateOtp(req.body)
    console.log(result)
    if(!result.sucess){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key}, {})
      return
    }else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, {})
      return
    }


} catch (error) {
  console.log(error)
  sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
}
}

// Check Credential
const checkCredential = async (req, res) =>{
  try {
    const result = await service.checkCredential(req.body)
    // console.log("I am coming ", result)

    if(!result.sucess){
      sendResponse(req, res, 401, responseCode.ERROR, {key: 'failed'},  result.errors)
      return
    }else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: 'success'}, {})
      return
    }
} catch (error) {
  console.log(error)
  sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
}
}

// Validate OTP
const validateOtp = async (req, res) =>{
  try {
    const result = await service.validateOtp(req.body)
    if(!result.sucess){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key}, {})
      return
    }else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, {})
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Sign Up
const signUp = async (req, res) =>{
  try {
    const result = await service.signUp(req.body)

    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    }else{
      sendResponse(req, res, 200, responseCode.PROFILE_PICTURE_PENDING, {key: result.key}, result.user)
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Set Profile
const setProfile = async (req, res) =>{
  try {
    const result = await service.setProfile(req.body, req.user)

    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    }
    else{
      sendResponse(req, res, 200, responseCode.ADDRESS_PENDING, {key: result.key}, result.userData)
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Add Address
const setAddress = async (req, res) =>{
  try {
    const result = await service.setAddress(req.body, req.user)
    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    }
    sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, result.userData)
    return
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Sign In
const signIn = async (req, res) =>{
  try {
    const result = await service.signIn(req.body) 
    if(!result.success){
      sendResponse(req, res, 401, result.code, {key: result.key},  result.errors)
      return
    }
    else{
      sendResponse(req, res, 200, result.code, {key: result.key}, result.user)
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
} 

// Logout
const logout = async (req, res) =>{
  try {
    const result = await service.logout(req.headers.token, req.user.user_id)
    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    } 
    else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, {})
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Forgot Password
const forgotPassword = async (req, res) =>{
  try {
    const result = await service.forgotPassword(req.body.email)
    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    }
    else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, {})
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

// Update Password
const updatePassword = async (req, res) =>{
  try {
    const result = await service.updatePassword(req.body, req.user)
    if(!result.success){
      sendResponse(req, res, 401, responseCode.ERROR, {key: result.key},  result.errors)
      return
    }
    else{
      sendResponse(req, res, 200, responseCode.SUCCESS, {key: result.key}, {})
      return
    }
  } catch (error) {
    console.log(error)
    sendResponse(req, res, 501, responseCode.ERROR, {key: "internalServerError"}, {})
  }
}

module.exports = {generateOtp, checkCredential, validateOtp, signUp, setProfile, setAddress, signIn, logout, forgotPassword, updatePassword}