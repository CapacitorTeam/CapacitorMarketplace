const User = require("../Models/User");
const postgresDao = require("../Daos/postgresDao");

async function registerUser(username, email, password) {

  const user = new User(username, email, password);

  await postgresDao.insertEntry(user);
}

module.exports = {
  registerUser,
};
