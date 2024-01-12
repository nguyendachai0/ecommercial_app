
const Category = require('../../models/Category'); 

class AdminCategoryController {
    renderAdminCategoryPage(req, res) {
      const categories = Category.getAllCategories();
      res.render('admin/category/index.ejs', {categories: categories, title: 'Admin Categories' });
    }
    addCategory(req, res) {
      const { title, description } = req.body;
      const nextCategoryId = Category.getLastCategoryId() + 1;
      const newCategory = {
        id: nextCategoryId,
        title: title,
        description: description
      };
      Category.addCategory(newCategory);
      const updatedCategories = Category.getAllCategories();
      res.json({ categories: updatedCategories });
    }
    editCategory(req, res) {
      const categoryId = req.params.id; 
      const categories = Category.getAllCategories();
      const categoryToEdit = Category.getCategoryById(categoryId);
      res.render('admin/category/index.ejs', { categories: categories, categoryToEdit: categoryToEdit, title: 'Admin Categories' });
  }
  updateCategory(req, res) {
    const categoryId = req.params.id; 
    const {id, title, description } = req.body;
    const updateCategory = {
      id: id,
      title: title,
      description: description
    };
    Category.updateCategory(updateCategory);
    const categories = Category.getAllCategories();
    const categoryToEdit = Category.getCategoryById(categoryId);
    res.json({categories: categories, categoryToEdit: categoryToEdit, title: 'Admin Categories'});
}

deleteCategory(req, res) {
    const categoryId = req.body.id; 
    Category.deleteCategory(categoryId);
    const updatedCategories = Category.getAllCategories();
   res.json({ categories: updatedCategories });
  }
}

  module.exports = new AdminCategoryController();
  