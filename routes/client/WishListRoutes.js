const express = require('express');
const router = express.Router();
const WishListController = require('../../controllers/client/WishListController');

class WishListRoutes {
  constructor() {
    this.configureRoutes();
  }
  configureRoutes() {
    router.get('/wishlist', WishListController.renderWishListPage);
    router.post(
        '/add-to-wishlist', WishListController.addToWishList
    );
    router.post('/delete-from-wishlist', WishListController.deleteFromWishList);

  }
  getRouter() {
    return router;
  }
  
}
module.exports = new WishListRoutes().getRouter();