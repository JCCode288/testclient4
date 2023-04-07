module.exports = class Errors extends Error {
  constructor(status, message) {
    super();
    this.message = { message };
    super.name = "Handled";
    this.status = status;
  }
};
