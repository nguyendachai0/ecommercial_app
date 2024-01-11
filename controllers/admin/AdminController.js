class AdminController {
    renderHomePage(req, res) { 
      res.render('admin/home', {title: 'Admin Dashboard'});
    }
  }
  
  module.exports = new AdminController();