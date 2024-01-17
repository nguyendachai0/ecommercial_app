const Product = require('../../models/Product');
const Order = require('../../models/Order');
class OrderController {

    renderOrderPage(req, res) {
      const cartData = req.session.cart || [];
      const total = cartData.reduce((acc, item) => acc + item.price, 0);
          res.render('client/checkout', { title: 'Order page', cart:cartData, total: total});
    }
    makeOrder(req, res){     
            const orderData = req.body;
            const cartData = req.session.cart || [];
            const total = cartData.reduce((acc, item) => acc + item.price, 0);
            const nextOrderId = Order.getLastOrderId() + 1;
            const newOrder = {
                id: nextOrderId,
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                street: orderData.street,
                city: orderData.city,
                country: orderData.country,
                phone: orderData.phone,
                email: orderData.email,
                items: cartData,
                total: total,
            };
           
             Order.addOrder(newOrder);
            req.session.cart = [];
            res.status(201).json({ message: 'Order placed successfully!' });
  }
    
}
module.exports = new OrderController();