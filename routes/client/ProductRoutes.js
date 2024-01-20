const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/client/ProductController');

class ProductRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    router.get('/shop', ProductController.renderShopPage);
    router.post('/shop', ProductController.filterProduct);
    router.get('/product/:id', ProductController.renderProductDetailPage);
  }
  getRouter() {
    return router;
  }
  
}
module.exports = new ProductRoutes().getRouter();