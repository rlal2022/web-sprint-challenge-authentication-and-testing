const User = require("../users/users-model");

async function checkUsername(req, res, next) {
  try {
    const { username } = req.body;
    const [user] = await User.findBy({ username: username });
    if (user) {
      next({ status: 401, message: "username taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkIfUsernameExists(req, res, next) {
  const { username } = req.body;
  const [user] = await User.findBy({ username: username });
  if (user) {
    next();
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
}

function checkCredentials(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
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
