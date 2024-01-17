// controllers/HomeController.js
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
class PageController {
  renderHomePage(req, res) {
    const featuredProducts = Category.getAllCategories();
    const user = User.getAllUsers();
    res.render('client/home', {featuredProducts: featuredProducts, title: 'Home page'});
  }
  renderShopPage(req,res){
    const categories = Category.getAllCategories();
    const products = Product.getAllProducts();
    res.render('client/shop', {categories: categories, products: products, title: 'Shop page'});
  }
  renderContactUsPage(req, res){
    res.render('client/contact-us', { title: 'Contact us page'});
  }
  renderAboutUsPage(req, res){
    res.render('client/about-us', { title: 'About us page'});
  }
  render404Page(req, res){
    res.render('client/404', { title: 'Page not found'});
  }
  renderMyAccountPage(req,res){
    res.render('client/my-account', { title: 'My account'});
  }
  renderEmptyCartPage(req, res){
    res.render('client/empty-cart', { title: 'Empty cart page'});
  }  renderWishList(req, res){
    res.render('client/wish-list', { title: 'Wish list page'});
  }
}

module.exports = new PageController();
