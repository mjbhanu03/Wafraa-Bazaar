const constant = require("../Constant/constant");
const { sendResponse } = require("./Middleware/middleware");
const jwt = require("jsonwebtoken");
const localizify = require("localizify");
const { t } = require("localizify");
const en = require("../Languages/en");
const hin = require("../Languages/hin");
const env = require("dotenv");
env.config();
const cryptolib = require("cryptlib");
const shakey = cryptolib.getHashSha256(process.env.KEY, 32);
const nodemailer = require("nodemailer");
const common = {
  // Create Token
  jwt_sign: (data, expiresIn = "7d") => {
    try {
      const token = jwt.sign(data, process.env.JWT_WEB_TOKEN, { expiresIn });
      return { success: true, key: "tokenGenerated", token: token };
    } catch (error) {
      console.log(error);
      return { success: false, key: "tokenGenerationFailed" };
    }
  },

  // Generate Token
  generateToken: (data) => {
    try {
      let userDetails = {
        user_id: data.user_id,
        email: data.email,
      };

      const token = common.jwt_sign(userDetails, "1d");

      return { success: true, key: "tokenGenerated", token: token.token };
    } catch (error) {
      console.log(error);
      return { success: false, key: "tokenGenerationFailed" };
    }
  },

  validate: (schema) => {
    return (req, res, next) => {
      if (!req.body) {
        sendResponse(
          req,
          res,
          401,
          constant.VALIDATION_ERROR,
          { key: "bodyMissing" },
          {},
        );
        return;
      }
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error
          ? Object.fromEntries(
              error.details.map((err) => [err.path[0], err.message]),
            )
          : {};
        return res.status(200).send({
          code: constant.VALIDATION_ERROR,
          message: "validationFailed",
          errors: errors,
        });
      } else {
        next();
      }
    };
  },

  encrypt_card: async (card_number) => {
    try {
      const encrypted_card = await cryptolib.encrypt(
        card_number,
        shakey,
        process.env.IV,
      );
      return encrypted_card;
    } catch (error) {
      console.log(error);
      return "cardEncryptionFailed";
    }
  },

  decrypt_card: async (encrypted_card) => {
    try {
      console.log("Encrypted Card:", encrypted_card);
      const decrypted_card = await cryptolib.decrypt(
        encrypted_card,
        shakey,
        process.env.IV,
      );
      const masked_card =
        decrypted_card.slice(0, -4).replace(/\d/g, "*") +
        decrypted_card.slice(-4);
      // console.log("Masked Card:", masked_card);
      return masked_card;
    } catch (error) {
      console.log(error);
      return "cardDecryptionFailed";
    }
  },

  sendEmail: async (to_email, subject, message) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    var mailOptions = {
      from: constant.from_email,
      to: to_email,
      subject: subject,
      html: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return { success: true, message: "emailSentSuccess", data: info };
    } catch (error) {
      console.log(error);
      return { success: false, message: "failToSendEmail", data: error };
    }
  },
};
module.exports = common;
