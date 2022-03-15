// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
require("dotenv").config();
// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(express.json());

module.exports = app;