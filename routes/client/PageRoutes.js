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
    router.get('/product-detail', PageController.renderProductDetailPage);
    router.get('/cart', PageController.renderCartPage);
    router.get('/wishlist', PageController.renderWishList);
    router.get('/check-out', PageController.renderCheckOutPage);
    router.get('/shop', PageController.renderShopPage);
    router.get('/shop/:id', PageController.renderShopPage);
    router.get('/empty-cart', PageController.renderEmptyCartPage);
    router.get('/404', PageController.render404Page);    
    router.get('/checkout', PageController.renderCheckOutPage);
    router.get('*', PageController.render404Page);

  }
  getRouter() {
    return router;
  }
}

module.exports = new PageRoutes().getRouter();
