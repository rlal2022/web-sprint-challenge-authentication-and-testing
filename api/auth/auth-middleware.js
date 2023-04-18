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

  // const { username } = req.body;
  // const [user] = await User.findBy({ username: username });
  // if (user) {
  //   next();
  // } else {
  //   next({ status: 422, message: "username taken" });
  // }
}

async function checkIfUsernameExists(req, res, next) {
  const { username } = req.body;
  const [user] = await User.findBy({ username: username });
  if (!user) {
    next({ status: 401, message: "Invalid credentials" });
  } else {
    req.user = user;
    next();
  }
}

//   const { username } = req.body;
//   const [user] = await User.findBy({ username: username });
//   if (user) {
//     next();
//   } else {
//     next({ status: 401, message: "invalid credentials" });
//   }
// }

function checkCredentials(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
}

module.exports = { checkUsername, checkIfUsernameExists, checkCredentials };
