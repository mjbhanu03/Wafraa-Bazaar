const { steps } = require('framer-motion')
const joi = require('joi')

// Generate OTP
const generateOtpSchema = joi.object({
  email: joi.string().email().optional(),
  country_code: joi.string().when('phone',{
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional()
  }),
  phone: joi.string().optional().when('purpose', {
    is: 's',
    then: joi.required(),
    otherwise: joi.optional()
  }),
  purpose: joi.string().valid('s', 'f').required()
}).or('phone', 'email')

// Check Credential
const checkCredentialSchema = joi.object({
  email: joi.string().email().required(),
  country_code: joi.string().when('phone', {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional()
  }),
  phone: joi.string().optional(),
  social_id: joi.string().optional()
}).or('phone', 'social_id')

// Validate OTP
const validateOtpSchema = joi.object({
  country_code: joi.string().required(),
  phone: joi.string().required(),
  otp: joi.string().length(4).required(),
  purpose: joi.string().valid('s', 'f').required()
})

// Sign Up Schema
const signUpSchema = joi.object({
  name: joi.string().when('login_type', {
    is: 's',
    then: joi.required(),
    otherwise: joi.optional()
  }),
  email: joi.string().email().required(),
  country_code: joi.string().when('login_type',{
    is: 's',
    then: joi.required(),
    otherwise: joi.forbidden()
  }),
  phone: joi.string().when('login_type', {
    is: 's',
    then: joi.required(),
    otherwise: joi.forbidden()
  }),
  password: joi.string().when('login_type', {
    is: 's',
    then: joi.required(),
    otherwise: joi.forbidden()
  }),
  confirm_password: joi.string().when('login_type', {
    is: 's',
    then: joi.required().valid(joi.ref('password')),
    otherwise: joi.forbidden()
  }),
  login_type: joi.string().valid('s', 'g').required(),
  social_id: joi.string().when('login_type', { 
    is: 'g' ,
    then: joi.required(),
    otherwise: joi.forbidden()
  }),
  device_token: joi.string().required(),
  device_type: joi.string().valid('a', 'i').required(),
  device_name: joi.string().required(),
  device_model: joi.string().required(),
  os_version: joi.string().required(),
  uuid: joi.string().required(),
  ip: joi.string().ip().required()
})

// Set Profile Schema
const setProfileSchema = joi.object({
  profile_pic: joi.string().optional(),
  steps: joi.number().required()
})

// Set Address Schema
const setAddressSchema = joi.object({
  steps: joi.number().required(),
  name: joi.string().required(),
  company: joi.string().optional(),
  address1: joi.string().required(),
  address2: joi.string().optional(),
  city_id: joi.number().required(),
  postal_code: joi.string().required(),
  latitude: joi.number().required(),
  longitude: joi.number().required()
})

// Sign In
const signInSchema = joi.object({
  social_id: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().when('email', {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional()
  }),
    device_token: joi.string().required(),
  device_type: joi.string().valid('a', 'i').required(),
  device_name: joi.string().required(),
  device_model: joi.string().required(),
  os_version: joi.string().required(),
  uuid: joi.string().required(),
  ip: joi.string().ip().required()
}).or('email', 'social_id')

// Forgot Password
const forgotPasswordSchema = joi.object({
  email: joi.string().email().required()
})

const updatePasswordSchema = joi.object({
  new_password: joi.string().required(),
  confirm_new_password: joi.string().valid(joi.ref('new_password')).required()
})
module.exports = {generateOtpSchema, checkCredentialSchema, validateOtpSchema, signUpSchema, setProfileSchema, setAddressSchema, signInSchema, forgotPasswordSchema, updatePasswordSchema }