const serviceUrl = "http://localhost:4001";
const { default: axios } = require("axios");

module.exports = class Controller {
  static async login(req, res) {
    try {
      let body = req.body;

      const { data } = await axios({
        method: "post",
        url: `${serviceUrl}/login`,
        data: body,
      });

      res.json(data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
  static async register(req, res) {
    try {
      let body = req.body;

      const { data } = await axios({
        method: "post",
        url: `${serviceUrl}/register`,
        data: body,
      });

      res.json(data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
  static async fetchUsers(req, res) {
    try {
      const { data } = await axios.get(`${serviceUrl}/users`);

      res.json(data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
};
