const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
class ProductController {
    renderProductDetailPage(req, res){
        const productId = req.params.id;
        const product = Product.getProductById(productId);
        res.render('client/product-details', {product: product,  title: 'Product detail'});
      }
}

module.exports = new ProductController();