const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/client/Home');
const AuthRoutes = require('./routes/AuthRoutes');
const AdminRoutes = require ('./routes/admin/Home');
const expressLayouts = require('express-ejs-layouts');
const AdminCategoryRoutes = require('./routes/admin/AdminCategoryRoutes');
const AdminProductRoutes = require('./routes/admin/AdminProductRoutes');
const  FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');


const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload());
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
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    store: new FileStore(),
    cookie: {maxAge: 24 * 60 * 60 * 1000, secure: false },
    saveUninitialized: true,
  })
);

app.get('/check-session', (req, res) => {
  if (req.session && req.session.user) {
    res.send(req.session);
    res.send('Session is saved in the browser.');
  } else {
    res.send('Session not found.');
  }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', AuthRoutes);
app.use('/', homeRoutes);
app.use('/',  AdminRoutes);
app.use('/', AdminCategoryRoutes);
app.use('/', AdminProductRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
