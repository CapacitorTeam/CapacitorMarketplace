const bcrypt = require("bcrypt");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.verification_code = Math.floor(1000 + Math.random() * 9000);
    this.hashed_pass = bcrypt.hashSync(password, 10);
  }


  toDBEntry() {
    return {
      username: this.username,
      email: this.email,
      hashed_pass: this.hashed_pass,
      verification_code: this.verification_code,
    };
  }
}

module.exports = User;
