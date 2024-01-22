
const Category = require('../../models/Category'); 
const User = require('../../models/User'); 
const Product = require('../../models/Product'); 
const Order = require('../../models/Order'); 
class AdminController {
    renderHomePage(req, res) { 
      const allCategories = Category.getAllCategories();
      const allUsers = User.getAllUsers();
      const allProducts = Product.getAllProducts();
      const allOrders = Order.getAllOrders();
      res.render('admin/home', {title: 'Admin Dashboard', allCategories: allCategories, allUsers: allUsers, allProducts: allProducts, allOrders: allOrders});
    }
  }
  
  module.exports = new AdminController();