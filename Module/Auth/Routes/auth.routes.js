const express = require('express')
const router = express.Router()
const controller = require('../Controller/auth.controller')
const common = require('../../../Common/common')
const validator = require('../Validator/auth.validator')
  
// Generate OTP
router.post('/generateOtp', common.validate(validator.generateOtpSchema), controller.generateOtp)

// Check Credential
router.post('/checkCredential', common.validate(validator.checkCredentialSchema), controller.checkCredential)

// Validate OTP
router.post('/validateOtp', common.validate(validator.validateOtpSchema), controller.validateOtp)

// Sign Up
router.post('/signUp', common.validate(validator.signUpSchema), controller.signUp)

// Set Profile
router.post('/setProfile', common.validate(validator.setProfileSchema), controller.setProfile)

// Set Address
router.post('/setAddressDetails', common.validate(validator.setAddressSchema), controller.setAddress)

// Sign In
router.post('/signIn', common.validate(validator.signInSchema), controller.signIn)

// Logout
router.post('/logout', controller.logout)

// Forgot Password
router.post('/forgotPassword', common.validate(validator.forgotPasswordSchema), controller.forgotPassword)

// Update Password
router.post('/updatePassword', common.validate(validator.updatePasswordSchema), controller.updatePassword)
module.exports = router