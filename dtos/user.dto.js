// DTO for User Signup
class SignupDTO {
  constructor({ id, name, password }) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
  //validate if all fields required and correct
  validate() {
    if (!this.id || !this.name || !this.password) {
      throw new Error("Username, password, and name are required");
    }
    if (this.password.length < 3) {
      throw new Error("Password must be at least 3 characters");
    }
  }
}

// DTO for User Login and delete
class LoginDTO {
  constructor({ id, password }) {
    this.id = id;
    this.password = password;
  }
  //validate if all fields input
  validate() {
    if (!this.id || !this.password) {
      throw new Error("Username and password are required");
    }
  }
}

module.exports = {
  SignupDTO,
  LoginDTO,
};
