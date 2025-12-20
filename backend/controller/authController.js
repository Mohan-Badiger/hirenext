const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const {
  createUsersTable,
  addUser,
  getUserByEmail,
} = require('../models/User');

createUsersTable();
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}
const signup = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await addUser(email, password);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email },
    });

  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const login=async(req,res)=>{

try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(user);
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
   const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }

}
module.exports = { signup, login };