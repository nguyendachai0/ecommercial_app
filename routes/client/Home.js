// routes/HomeRoutes.js

const express = require('express');
const router = express.Router();
const HomeController = require('../../controllers/client/HomeController');

class HomeRoutes {
  constructor() {
    this.configureRoutes();
  }

  configureRoutes() {
    router.get('/', HomeController.renderHomePage);
  }

  getRouter() {
    return router;
  }
}

module.exports = new HomeRoutes().getRouter();
