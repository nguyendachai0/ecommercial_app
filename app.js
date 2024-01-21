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
const OrderRoutes = require('./routes/client/OrderRoutes');
const expressLayouts = require('express-ejs-layouts');
const AdminCategoryRoutes = require('./routes/admin/AdminCategoryRoutes');
const AdminProductRoutes = require('./routes/admin/AdminProductRoutes');
const AdminOrderRoutes = require('./routes/admin/AdminOrderRoutes');
const CartRoutes = require('./routes/client/CartRoutes');
const WishListRoutes = require('./routes/client/WishListRoutes');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const {sign, verify} = require("jsonwebtoken");
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
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/';
  } else {
    res.locals.layout = 'client/layout';
    const cartData = req.session.cart || [];
    const itemsCount = cartData.length;
   const total = cartData.reduce((acc, item) => acc + item.price, 0);
   const wishListData = req.session.wishList || [];
   const itemsWishListCount = wishListData.length;
    res.locals.itemsCount = itemsCount;
    res.locals.cartData = cartData;
    res.locals.total = total;
    res.locals.wishList = wishListData;
    res.locals.itemsWishListCount = itemsWishListCount;
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/'
  
  }
  next();
});
app.use((req, res, next) => {
  const accessToken = req.cookies["access-token"];

  // Check if the cookie exists
  if (accessToken) {
    // Decode the access token to get user data
    const decodedToken = verify(accessToken, "jwtsecret");
    if (decodedToken) {
      req.user = {
        email: decodedToken.email,
        id: decodedToken.id,
        role: decodedToken.role
      };
      res.locals.user = req.user;
    }
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
  const accessToken = req.cookies["access-token"];
  res.json( accessToken['username'] );
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
app.use('/', WishListRoutes);
app.use('/', OrderRoutes);

app.use('/',  AdminRoutes);
app.use('/' ,AdminCategoryRoutes);
app.use('/', AdminProductRoutes);
app.use('', AdminOrderRoutes);
// app.get('*', (req, res) => {
//   res.render('client/404', { title: 'Page not found' });
// })
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
