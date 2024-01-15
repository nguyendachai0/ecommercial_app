const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/client/Home');
const AuthRoutes = require('./routes/AuthRoutes');
const AdminRoutes = require ('./routes/admin/Home');
const expressLayouts = require('express-ejs-layouts');
const AdminCategoryRoutes = require('./routes/admin/AdminCategoryRoutes');
const AdminProductRoutes = require('./routes/admin/AdminProductRoutes');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const {createTokens, validateToken} = require('./JWT');

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload());
app.use(cookieParser());
app.use(expressLayouts);
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/admin')) {
    res.locals.layout = 'admin/layout';
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/admin/';
  } else {
    res.locals.layout = 'client/layout';
  }
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/profile",validateToken, (req, res)=> {
  res.json("profile");
})
app.get('/logout', (req, res)=> {
 res.clearCookie('access-token');
 res.redirect('/');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', AuthRoutes);
app.use('/', homeRoutes);
app.use('/',  AdminRoutes);
app.use('/', AdminCategoryRoutes);
app.use('/',validateToken, AdminProductRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
