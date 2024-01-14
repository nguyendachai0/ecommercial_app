// models/Product.js
const fs = require('fs');

class Product {
    constructor() {
        this.products = this.loadProducts();
    }
    
    loadProducts() {
        const data = fs.readFileSync('database/products.json', 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.products || [];
    }

    saveProducts() {
        const data = JSON.stringify({products: this.products}, null, 2);
        fs.writeFileSync('database/products.json', data, 'utf8');
    }

    getAllProducts() {
        return this.products;
    }
    getProductById(productId) {
        return this.products.find(product => product.id == productId);
    }
    getLastProductId() {
      if (this.products.length === 0) {
          return null; // No products, return null or handle accordingly
      }
      return this.products[this.products.length - 1].id;
  }

    addProduct(newProduct) {
        this.products.push(newProduct);
        this.saveProducts();
    }

    updateProduct(updatedProduct) {
        const index = this.products.findIndex(product => product.id == updatedProduct.id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this.saveProducts();
        }
    }

    deleteProduct(productId) {
        
        this.products = this.products.filter(product => product.id != (productId));
        this.saveProducts(); 
    }
}

module.exports = new Product();
