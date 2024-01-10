// routes/AuthRoutes.js

const express = require('express');
const AuthController = require('../controllers/AuthController');

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/login', AuthController.showLoginForm);
    this.router.post('/login', AuthController.login);
    this.router.get('/register', AuthController.showRegisterForm);
    this.router.post('/register', AuthController.register);
    this.router.get('/logout', AuthController.logout);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AuthRoutes().getRouter();
