const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const AdminProductController = require('../../controllers/admin/AdminProductController');
class AdminProductRoutes {
  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }
  
  configureRoutes() {
    this.router.get('/admin/product', AdminProductController.renderAdminProductPage);
    this.router.post('/admin/product', AdminProductController.addProduct);
    this.router.get('/admin/product/edit/:id', AdminProductController.editProduct);
    this.router.post('/admin/product/edit/:id', AdminProductController.updateProduct);
    this.router.post('/admin/product/delete', AdminProductController.deleteProduct);
  }
  getRouter() {
    return this.router;
  }
}

module.exports = new AdminProductRoutes().getRouter();