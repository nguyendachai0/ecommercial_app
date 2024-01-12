module.exports = (req, res, next) => {
    // Check if the user is logged in and is an admin
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next();
    } else {
      res.status(403).send('Forbidden');
    }
  };