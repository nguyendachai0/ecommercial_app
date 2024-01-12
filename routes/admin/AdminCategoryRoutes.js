const express = require('express');
const AdminCategoryController = require('../../controllers/admin/AdminCategoryController');
class AdminCategoryRoutes {
  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }
  
  configureRoutes() {
    this.router.get('/admin/category', AdminCategoryController.renderAdminCategoryPage);
    this.router.post('/admin/category', AdminCategoryController.addCategory);
    this.router.get('/admin/category/edit/:id', AdminCategoryController.editCategory);
    this.router.post('/admin/category/edit/:id', AdminCategoryController.updateCategory);
    this.router.post('/admin/category/delete', AdminCategoryController.deleteCategory);
    // Add more routes for category administration as needed
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AdminCategoryRoutes().getRouter();