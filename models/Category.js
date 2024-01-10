// models/Category.js
const fs = require('fs');

class Category {
    constructor() {
        this.categories = this.loadCategories();
    }

    loadCategories() {
        const data = fs.readFileSync('database/categories.json', 'utf8');
        return JSON.parse(data);
    }

    saveCategories() {
        const data = JSON.stringify(this.categories, null, 2);
        fs.writeFileSync('database/categories.json', data, 'utf8');
    }

    getAllCategories() {
        return this.categories;
    }

    getCategoryById(categoryId) {
        return this.categories.find(category => category.id === categoryId);
    }

    addCategory(newCategory) {
        this.categories.push(newCategory);
        this.saveCategories();
    }

    updateCategory(updatedCategory) {
        const index = this.categories.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
            this.categories[index] = updatedCategory;
            this.saveCategories();
        }
    }

    deleteCategory(categoryId) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.saveCategories();
    }
}

module.exports = new Category();
