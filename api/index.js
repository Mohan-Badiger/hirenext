const app = require('../backend/server.js');

module.exports = (req, res) => {
  res.status(200).json({ message: "API working" });
};

module.exports = app;
