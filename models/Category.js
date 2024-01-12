// models/Categorie.js
const fs = require('fs');

class Category {
    constructor() {
        this.categories = this.loadCategories();
    }
    
    loadCategories() {
        const data = fs.readFileSync('database/categories.json', 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.categories || [];
    }

    saveCategories() {
        const data = JSON.stringify({categories: this.categories}, null, 2);
        fs.writeFileSync('database/categories.json', data, 'utf8');
    }

    getAllCategories() {
        return this.categories;
    }

   

    getCategoryById(categoryId) {
        return this.categories.find(category => category.id == categoryId);
    }
    getLastCategoryId() {
      if (this.categories.length === 0) {
          return null; // No categories, return null or handle accordingly
      }
      return this.categories[this.categories.length - 1].id;
  }

    addCategory(newCategory) {
        this.categories.push(newCategory);
        this.saveCategories();
    }

    updateCategory(updatedCategory) {
        const index = this.categories.findIndex(category => category.id == updatedCategory.id);
        if (index !== -1) {
            this.categories[index] = updatedCategory;
            this.saveCategories();
        }
    }

    deleteCategory(categoryId) {
        
        this.categories = this.categories.filter(category => category.id != (categoryId));
        this.saveCategories(); 
    }
    getAllCategoryNamesWithIds() {
        return this.categories.map(category => ({
            id: category.id,
            title: category.title,
        }));
    }
}

module.exports = new Category();
