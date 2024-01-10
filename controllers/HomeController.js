// controllers/HomeController.js
const Category = require('../models/Category');
const User = require('../models/User');
class HomeController {
  renderHomePage(req, res) {
    const featuredProducts = Category.getAllCategories();
    const user = User.getAllUsers();
    
   
    res.render('client/home', {featuredProducts: featuredProducts, title: 'Home page'});
  }
}

module.exports = new HomeController();
