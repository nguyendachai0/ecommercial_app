const express = require('express');
const AdminOrderController = require('../../controllers/admin/AdminOrderController');
class AdminOrderRoutes {
  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }
  
  configureRoutes() {
    this.router.get('/admin/order', AdminOrderController.renderAdminOrderPage);
    this.router.post('/admin/order', AdminOrderController.renderAdminOrderDetails);
  }
  getRouter() {
    return this.router;
  }
}

module.exports = new AdminOrderRoutes().getRouter();