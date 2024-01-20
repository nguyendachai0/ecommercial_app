// routes/HomeRoutes.js

const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/AdminController');
const {createTokens, validateToken, validateAdmin} = require('../../JWT');

// const authorizeAdmin = require('../../middlewares/AdminMiddleware');
class AdminRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    // Validate token for authentication
    router.use(validateToken);    // Validate admin privileges
    router.use(validateAdmin);
    router.get('/admin', AdminController.renderHomePage);
  }

  getRouter() {
    return router;
  }
}

module.exports = new AdminRoutes().getRouter();
