const responseCode = require("../../Constant/constant");
const jwt = require("jsonwebtoken");
const { default: localizify } = require("localizify");
const { t } = require("localizify");
const en = require("../../Languages/en");
const hin = require("../../Languages/hin");
const cryptoLib = require("cryptlib");
const shaKey = cryptoLib.getHashSha256(process.env.KEY, 32);
const env = require("dotenv");

env.config();
// const constant = require('./Constant/constant')
const repository = require("../../Module/Auth/Repository/auth.repository");

const bypassRoutes = [
  "/auth/v1",
  "/auth/login",
  "/auth/v1/generateOtp",
  "/auth/v1/validateOtp",
  "/auth/v1/signUp",
  "/auth/v1/signIn",
  "/auth/v1/checkCredential",
];

// Check Token
const checkToken = async (req, res, next) => {
  try {
    if (bypassRoutes.includes(req.path)) {
      return next();
    }

    const token = req.headers.token;
    const isTokenLoggedOut = await repository.checkToken(token);
    if (!token)
      return res
        .status(401)
        .send({ code: responseCode.ERROR, message: "tokenMissing", data: {} });

    const decoded = jwt.verify(token, process.env.JWT_WEB_TOKEN);

    if (!decoded)
      return res
        .status(401)
        .send({ code: responseCode.ERROR, message: "tokenExpired", data: {} });
    if (!isTokenLoggedOut)
      return res
        .status(401)
        .send({ code: responseCode.ERROR, message: "invalidToken", data: {} });

    req.user = decoded;
    // console.log(req.user)

    next();
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      401,
      responseCode.ERROR,
      { key: "tokenMissing" },
      {},
    );
  }
};

// Get Message
const getMessage = (requestLanguage = "en", key = "failed", value) => {
  try {
    // console.log(requestLanguage, key, value)
    localizify.add("en", en).add("hin", hin).setLocale(requestLanguage);

    let message = t(key, value);

    return message;
  } catch (error) {
    console.log(error);
    return "somethingWentWrong";
  }
};

// Send Response
const sendResponse = async (
  req,
  res,
  statuscode,
  response_code,
  { key = "failed", component = {} },
  data = {},
) => {
  // console.log(key, component)
  const message = await getMessage(
    req.headers["accept-language"],
    key,
    component,
  );
  // console.log('me khiladi', response_code)
  let response = { code: response_code, message: message, data: data };
  // console.log(response_code)
  return res.status(statuscode).send(response);
};

// Check API Key
const checkAPIKey = (req, res, next) => {
  const apiKey = req.headers["api-key"];

  if (process.env.API_KEY !== apiKey) {
    sendResponse(req, res, 401, 2, { key: "apiKeyMissing" }, {});
  } else {
    next();
  }
};

const encryption = (responseData) => {
  try {
    if (responseData && Object.keys(responseData).length > 0) {
      return cryptoLib.encrypt(
        JSON.stringify(responseData),
        shaKey,
        process.env.IV,
      );
    }
  } catch (error) {
    console.log(error);
    return responseData;
  }
};

const decryption = (req, res, next) => {
  try {
    // console.log(req.body)
    if (req.body && req.body.length > 0) {
      req.body = JSON.parse(
        cryptoLib.decrypt(req.body, shaKey, process.env.IV),
      );
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return sendResponse(req, res, 200, 0, "Bad Decryption", {});
  }
};



module.exports = {
  sendResponse,
  checkToken,
  checkAPIKey,
  encryption,
  decryption,
};
