
const Order = require('../../models/Order'); 

class AdminOrderController {
    renderAdminOrderPage(req, res){
      const orders = Order.getAllOrders();
      res.render('admin/order/index.ejs', {orders: orders, title: 'Admin Orders' });
    }
    renderAdminOrderDetails(req, res) {
      const orderId = req.body.orderId;
      const order = Order.getOrderById(orderId);
      const orders = Order.getAllOrders();
      res.render('admin/order/index.ejs', {order: order, orders: orders, title: 'Admin Order Details' });
    }

  }
  module.exports = new AdminOrderController();