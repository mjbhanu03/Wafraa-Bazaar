const constant = require('./Constant/constant')
const { sendResponse } = require('./Middleware/middleware')
const jwt = require("jsonwebtoken")
const localizify = require('localizify')
const {t} = require('localizify')
const en = require('../Languages/en')
const hin = require('../Languages/hin')
const env = require('dotenv')
env.config()

const common = {
  // Create Token
  jwt_sign: (data, expiresIn = '7d')=>{
    try {
      const token = jwt.sign(data, process.env.JWT_WEB_TOKEN, { expiresIn })
      return { success: true, key: "tokenGenerated", token: token }
    } catch (error) {
      console.log(error)
      return { success: false, key: "tokenGenerationFailed" }
    }
  },

  // Generate Token
  generateToken: (data) =>{
    try {
      let userDetails = {
        user_id: data.user_id,
        email: data.email
      }

      const token = common.jwt_sign(userDetails, '1d')

      return { success: true, key: "tokenGenerated", token: token.token }

    } catch (error) {
      console.log(error)
      return { success: false, key: "tokenGenerationFailed" }
    }
  },

  validate: (schema)=>{
    return (req, res, next)=>{
      if(!req.body) {
        sendResponse(req, res, 401, constant.VALIDATION_ERROR, {key: "bodyMissing"}, {})
        return
      }
      const {error} = schema.validate(req.body, {abortEarly: false})
      if(error){
const errors = error
  ? Object.fromEntries(error.details.map(err => [err.path[0], err.message]))
  : {};
      return res.status(200).send({ code: constant.VALIDATION_ERROR, message: "validationFailed", errors: errors })

    } else {
      next()
    } 
  }
}
}
module.exports = common