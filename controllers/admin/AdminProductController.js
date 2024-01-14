
const Product = require('../../models/Product'); 
const Category = require('../../models/Category');
const fileUpload = require('express-fileupload');
const path = require ('path');
const fs = require('fs');
const projectPath = 'C:/Users/nguye/Documents/FPTPOLY/java_script_nang_cao/web_ban_hang';
class AdminProductController {
    renderAdminProductPage(req, res) {
      const products = Product.getAllProducts();
      const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
      res.render('admin/product/index.ejs', {products: products,allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products' });
    }
    addProduct(req, res) {
        const formData = req.body;
        const { title, description, category_id } = req.body;
        if (!req.files || Object.keys(req.files).length === 0) {
          throw new Error('No files were uploaded.');
      }
      const image = req.files.image;
        const nextProductId = Product.getLastProductId() + 1;
        const newProduct = {
            id: nextProductId,
            title: title,
            description: description,
            category_id: Number(category_id),
            image: image.name, 
        };    
        const uploadPath = path.join(projectPath, '/public/uploads/product', image.name);
        const uploadFold = path.join( projectPath,'/public/uploads/product');
        if (!fs.existsSync(uploadFold)) {
          fs.mkdirSync(uploadFold, { recursive: true });
        }
        Product.addProduct(newProduct);
      image.mv(uploadPath, (err) => {
        if (err) {
          console.error(`Error moving file: ${err}`);
          res.status(500).json({ error: 'Internal Server Errors ss' });
        } else {
          const updatedProducts = Product.getAllProducts();
          const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
          res.json({ products: updatedProducts, allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products' });
        }
      });
    }
    editProduct(req, res) {
      
      const productId = req.params.id; 
      const products = Product.getAllProducts();
      const productToEdit = Product.getProductById(productId);
      const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
      res.render('admin/product/index.ejs', { products: products, productToEdit: productToEdit,allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products' });
  }
  updateProduct(req, res) {
    const formData = req.body;
    const productId = req.params.id; 
    const {id, title, description, category_id } = req.body;
   
  const image = req.files.image;
    const updateProduct = {
      id: id, 
      title: title,
      description: description,
      category_id: Number(category_id),
      image: image.name, 
    };
    Product.updateProduct(updateProduct);
    const uploadPath = path.join(projectPath, '/public/uploads/product', image.name);
    const uploadFold = path.join( projectPath,'/public/uploads/product');
    if (!fs.existsSync(uploadFold)) {
      fs.mkdirSync(uploadFold, { recursive: true });
    }
    Product.updateProduct(updateProduct);
  image.mv(uploadPath, (err) => {
    if (err) {
      console.error(`Error moving file: ${err}`);
      res.status(500).json({ error: 'Internal Server Errors ss' });
    } else {
      Product.updateProduct(updateProduct);
      const products = Product.getAllProducts();
      const productToEdit = Product.getProductById(productId);
      const allCategoryNamesWithIds = Category.getAllCategoryNamesWithIds();
      res.json({products: products, productToEdit: productToEdit,allCategoryNamesWithIds: allCategoryNamesWithIds, title: 'Admin Products'});    }
  });
   
}

deleteProduct(req, res) {
    const productId = req.body.id; 
    Product.deleteProduct(productId);
    const updatedProducts = Product.getAllProducts();
   res.json({ products: updatedProducts });
  }
}

  module.exports = new AdminProductController();
  