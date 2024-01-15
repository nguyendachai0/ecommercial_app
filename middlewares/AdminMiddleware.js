// module.exports = (req, res, next) => {
//     // Check if the user is logged in and is an admin
//     if (req.session && req.session.user ) {
//       return next();
//     } else {
//       res.status(403).send('Forbidden');
//     }
//   };