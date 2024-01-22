// controllers/HomeController.js
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
class PageController {
  renderHomePage(req, res) {
    const allCategories = Category.getAllCategories();
    const newProducts = Product.getNewProducts(8);
    const bestSellers = Product.getNewProducts(12);
    res.render('client/home', {allCategories: allCategories, newProducts: newProducts,bestSellers: bestSellers, title: 'Home page'});
  }
  
  renderContactUsPage(req, res){
    const breadcrumbData = [
      { label: 'Contact', link: '/contact-us' }
    ];
    res.render('client/contact-us', { title: 'Contact us page', breadcrumbData: breadcrumbData});
  }
  renderAboutUsPage(req, res){
    const breadcrumbData = [
      { label: 'About us', link: '/about-us' }
    ];
    res.render('client/about-us', { title: 'About us page', breadcrumbData: breadcrumbData});
  }
  render404Page(req, res){
    const breadcrumbData = [
      { label: 'Error', link: '/404' }
    ];
    res.render('client/404', { title: 'Page not found', breadcrumbData: breadcrumbData});
  }
  renderAccessDeniedPage(req, res){
    const breadcrumbData = [
      { label: 'Access denied', link: '/access-denied' }
    ];
    res.render('client/access-denied', { title: 'Access Denied', breadcrumbData: breadcrumbData});
  }
  renderMyAccountPage(req,res){
    const breadcrumbData = [
      { label: 'My account', link: '/my-account' }
    ];
    res.render('client/my-account', { title: 'My account'});
  }
}

module.exports = new PageController();
