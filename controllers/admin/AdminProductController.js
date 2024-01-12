
const Product = require('../../models/Product'); 
const Category = require('../../models/Category');

class AdminProductController {
    renderAdminProductPage(req, res) {
      const products = Product.getAllProducts();
      const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
    
      res.render('admin/product/index.ejs', {products: products,allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products' });
    }
    addProduct(req, res) {
        
      const { title, description, category_id, image  } = req.body;
      const nextProductId = Product.getLastProductId() + 1;
      const newProduct = {
        id: nextProductId,
        title: title,
        description: description,
        category_id: category_id,
        image: image,
      };
      Product.addProduct(newProduct);
      const updatedProducts = Product.getAllProducts();
      res.json({ products: updatedProducts });
    }
    editProduct(req, res) {
      const productId = req.params.id; 
      const products = Product.getAllProducts();
      const productToEdit = Product.getProductById(productId);
      res.render('admin/product/index.ejs', { products: products, productToEdit: productToEdit, title: 'Admin Products' });
  }
  updateProduct(req, res) {
    const productId = req.params.id; 
    const {id, title, description } = req.body;
    const updateProduct = {
      id: id,
      title: title,
      description: description
    };
    Product.updateProduct(updateProduct);
    const products = Product.getAllProducts();
    const productToEdit = Product.getProductById(productId);
    res.json({products: products, productToEdit: productToEdit, title: 'Admin Products'});
}

deleteProduct(req, res) {
    const productId = req.body.id; 
    Product.deleteProduct(productId);
    const updatedProducts = Product.getAllProducts();
   res.json({ products: updatedProducts });
  }
}

  module.exports = new AdminProductController();
  