// controllers/AuthController.js

const bcrypt = require('bcrypt');
const User = require('../models/User'); 

class AuthController {
 
  showLoginForm(req, res) {
    const user = User.getAllUsers();
    
    res.render('auth/login', { title: 'Login page'});
  }
  showRegisterForm(req, res){
    res.render('auth/register', { title: 'Register page'});
  }

  async login(req, res) {
  
    const { email, password } = req.body;
  

    // Simulated user data retrieval (replace with your actual database query)
    const user = User.getUserByEmail(email);
      
    if (user && await bcrypt.compare(password, user.password))
     {
      req.session.user = user; 
      res.redirect('/');
    } else {
     
      res.render('login', { error: 'Invalid username or password', title: 'Login page' });
    }
  }
    async register(req, res) { 
    const { email, password, password2 } = req.body;
    
    if (password !== password2) {
      return res.render('auth/register', { error: 'Passwords do not match', title: 'Register page' });
    }
    try {
      const existingUser =  User.getUserByEmail(email);
      if (existingUser) {
      
        return res.render('auth/register', { error: 'User already exists', title: 'Register page' });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const nextUserId = User.getLastUserId() + 1;
      
      const newUser = {
        id: nextUserId,
        email: email,
        password: hashedPassword
      }
     
      User.addUser(newUser);
      res.redirect('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      res.send(error.message);
      res.render('auth/register', { error: 'Error during registration', title: 'Register page' });
    }
    }
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}

module.exports = new AuthController();
