// routes/HomeRoutes.js

const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/AdminController');

class AdminRoutes {
  constructor() {
    this.configureRoutes();
  }

  configureRoutes() {
    router.get('/admin', AdminController.renderHomePage);
  }

  getRouter() {
    return router;
  }
}

module.exports = new AdminRoutes().getRouter();
