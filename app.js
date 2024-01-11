const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/client/Home');
const AuthRoutes = require('./routes/AuthRoutes');
const AdminRoutes = require ('./routes/admin/Home');
const expressLayouts = require('express-ejs-layouts');
const AdminCategoryRoutes = require('./routes/admin/AdminCategoryRoutes');
const app = express();
const PORT = 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/admin')) {
    // Use admin layout for routes starting with '/admin'
    res.locals.layout = 'admin/layout';
    app.locals.base_url = process.env.BASE_URL || 'http://localhost:3000/admin/';
  } else {
    // Use client layout for other routes
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
    saveUninitialized: true
  })
);

app.get('/users', (req, res) => {
  try {
    // Read data from the JSON file
    const rawData = fs.readFileSync('/database/users.json');
    const data = JSON.parse(rawData);

    // Send the users as a response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/check-session', (req, res) => {
  // Check if session is available
  if (req.session && req.session.user) {
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

// app.get('/', (req, res) => {
//   res.render('client/index', {title: 'HomePage'})
// });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});