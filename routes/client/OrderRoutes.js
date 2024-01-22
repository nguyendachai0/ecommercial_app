const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/client/OrderController');

class OrderRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    router.get('/checkout', OrderController.renderCheckoutPage);
    router.post('/checkout', OrderController.makeOrder);
  }
  getRouter() {
    return router;
  }
  
}
module.exports = new OrderRoutes().getRouter();