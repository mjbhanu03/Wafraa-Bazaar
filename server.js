const express = require("express");
const db = require("./Config/db");
const env = require("dotenv");

const auth = require("./Module/Auth/Routes/auth.routes");
const user = require("./Module/User/Routes/user.routes");
const { checkToken, checkAPIKey, decryption } = require("./Common/Middleware/middleware");

const app = express();
env.config();

app.use(express.text());
app.use(express.json());

app.use(checkAPIKey);
app.use(checkToken);
app.use(decryption)

app.use("/auth/v1", auth);
app.use("/user/v1", user);

try {
  app.listen(process.env.PORT);
} catch (error) {
  console.log(error);
}
