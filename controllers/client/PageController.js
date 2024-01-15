// controllers/HomeController.js
const Category = require('../../models/Category');
const User = require('../../models/User');
class PageController {
  renderHomePage(req, res) {
    const featuredProducts = Category.getAllCategories();
    const user = User.getAllUsers();
    res.render('client/home', {featuredProducts: featuredProducts, title: 'Home page'});
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
  renderProductDetailPage(req, res){
    res.render('client/product-detail', { title: 'Product detail'});
  }
  renderCartPage(req, res){
    res.render('client/cart', { title: 'Cart page'});
  }
  renderEmptyCartPage(req, res){
    res.render('client/empty-cart', { title: 'Empty cart page'});
  }
  renderCheckOutPage(req, res){
    res.render('client/checkout', { title: 'Check out page'});
  }
  renderShopPage(req,res){
    res.render('client/shop', { title: 'Shop page'});
  }
  renderWishList(req, res){
    res.render('client/wish-list', { title: 'Wish list page'});
  }
}

module.exports = new PageController();
