// routes/HomeRoutes.js

const express = require('express');
const router = express.Router();
const PageController = require('../../controllers/client/PageController');

class PageRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    router.get('/', PageController.renderHomePage);
    router.get('/contact-us', PageController.renderContactUsPage);
    router.get('/about-us', PageController.renderAboutUsPage);
    router.get('/my-account', PageController.renderMyAccountPage);
    router.get('/404', PageController.render404Page);    
    router.get('/access-denied', PageController.renderAccessDeniedPage);    
  }
  getRouter() {
    return router;
  }
}

module.exports = new PageRoutes().getRouter();
