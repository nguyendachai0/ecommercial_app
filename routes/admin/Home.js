// routes/HomeRoutes.js

const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/AdminController');
// const authorizeAdmin = require('../../middlewares/AdminMiddleware');
class AdminRoutes {
  constructor() {
    this.configureRoutes();
  }

  configureRoutes() {
    // router.use(authorizeAdmin);
    router.get('/admin', AdminController.renderHomePage);
  }

  getRouter() {
    return router;
  }
}

module.exports = new AdminRoutes().getRouter();
