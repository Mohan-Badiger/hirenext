const authRouter = require('express').Router();
const { signup, login } = require('../controller/authController');
authRouter.post('/signup', signup);
authRouter.post('/login', login);
module.exports = authRouter;