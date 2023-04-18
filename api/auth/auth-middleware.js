const User = require("../users/users-model");
const db = require("../../data/dbConfig");

async function checkUsername(req, res, next) {
  const user = await db("users".where("username"), req.body.username).first();
  if (!user) {
    next();
  } else {
    next({ status: 422, message: "Username taken" });
  }
}

async function checkIfUsernameExists(req, res, next) {
  const user = await User.findBy({ username: req.body.username });
  if (user) {
    next({ status: 401, message: "Invalid credentials" });
  } else {
    next();
  }
}

function checkCredentials(req, res, next) {
  const user = req.body;
  if (
    user.username &&
    user.password &&
    user.username.length &&
    user.password.length
  ) {
    next();
  } else {
    next({ status: 401, message: "username and password required" });
  }
}

module.exports = { checkUsername, checkIfUsernameExists, checkCredentials };

/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
