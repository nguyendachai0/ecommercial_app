const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
class ProductController {
  renderShopPage(req,res){
    const categories = Category.getAllCategories();
    const products = Product.getAllProducts();
    const breadcrumbData = [
      { label: 'Shop', link: '/shop' }
    ];
    res.render('client/shop', {categories: categories, products: products, title: 'Shop page', breadcrumbData: breadcrumbData});
  }
  filterProduct(req, res) {
   
    const categoryId = req.body.id;
    const priceRange = req.body.priceRange;
    let filteredProducts = Product.getAllProducts();
    if (categoryId) {
      filteredProducts = Product.getProductsByCategoryId(categoryId);
   }
   if (priceRange && priceRange.length === 2) {
    filteredProducts = Product.getProductsByPriceRange(priceRange, filteredProducts);
}
    const categories = Category.getAllCategories();
    // const breadcrumbData = [
    //   { label: 'Shop', link: '/shop' },
    //   { label: categories[categoryId].title, link: '/shop/' + categoryId }
    // ];
    res.json({categories: categories, categoryId: categoryId, products: filteredProducts, title: 'Shop page'});
  }
    renderProductDetailPage(req, res){
        const productId = req.params.id;
        const product = Product.getProductById(productId);
        res.render('client/product-details', {product: product,  title: 'Product detail'});
      }
}

module.exports = new ProductController();