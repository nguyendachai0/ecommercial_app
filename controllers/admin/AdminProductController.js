
const Product = require('../../models/Product'); 
const Category = require('../../models/Category');
const path = require ('path');
const fs = require('fs');
class AdminProductController {
    renderAdminProductPage(req, res) {
      const products = Product.getAllProducts();
      const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
      res.render('admin/product/index.ejs', {products: products,allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products' });
    }
    addProduct(req, res) {
      try {
        const { title, description, category_id } = req.body;
        console.log(title, description, category_id);
        const image = req.files && req.files.image;
        if (!image) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
        const nextProductId = Product.getLastProductId() + 1;
        const newProduct = {
            id: nextProductId,
            title: title,
            description: description,
            category_id: Number(category_id),
            image: image.name, // Save the filename or other relevant information
        };     
        const imageDestination = path.join(__dirname, 'Images', Date.now() + '_' + image.name);
        fs.rename(image.path, imageDestination, (err) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
          }
      Product.addProduct(newProduct);
      const updatedProducts = Product.getAllProducts();
      res.json({ products: updatedProducts });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Errors' });
    }
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
  