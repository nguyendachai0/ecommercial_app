const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {createTokens, validateToken, validateAdmin} = require('./JWT');
const session = require('express-session');
const PageRoutes = require('./routes/client/PageRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const AdminRoutes = require ('./routes/admin/Home');
const ProductRoutes = require('./routes/client/ProductRoutes');
const expressLayouts = require('express-ejs-layouts');
const AdminCategoryRoutes = require('./routes/admin/AdminCategoryRoutes');
const AdminProductRoutes = require('./routes/admin/AdminProductRoutes');
const CartRoutes = require('./routes/client/CartRoutes');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload());
app.use(cookieParser());
app.use(expressLayouts);
app.use(
  session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/admin')) {
    res.locals.layout = 'admin/layout';
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/admin/';
  } else {
    res.locals.layout = 'client/layout';
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/'
  }
  next();
});
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/admin')) {
    validateAdmin(req, res, next);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app
app.get("/profile",validateAdmin, (req, res)=> {
  res.json("profile");
})
app.get('/logout', (req, res)=> {
 res.clearCookie('access-token');
 res.redirect('/');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', AuthRoutes);
app.use('/', PageRoutes);
app.use('/', ProductRoutes);
app.use('/', CartRoutes);
app.get('*', (req, res) => {
  res.render('client/404', { title: 'Page not found' });
})
app.use('/',  AdminRoutes);
app.use('/' ,AdminCategoryRoutes);
app.use('/', AdminProductRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
