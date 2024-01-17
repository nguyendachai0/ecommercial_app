const express = require('express');
const router = express.Router();
const CartController = require('../../controllers/client/CartController');

class CartRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    router.get('/cart', CartController.renderCartPage);
    router.post(
        '/add-to-cart', CartController.addToCart
    );
  }
  getRouter() {
    return router;
  }
  
}
module.exports = new CartRoutes().getRouter();