const decodeUserMiddleware = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
  
    // Check if the cookie exists
    if (accessToken) {
      // Decode the access token to get user data
      const decodedToken = verify(accessToken, "jwtsecret");
  
      // Check if the decoding was successful
      if (decodedToken) {
        // Add user data to req for all routes to access
        req.user = {
          username: decodedToken.username,
          id: decodedToken.id,
          role: decodedToken.role
        };
      }
    }
  
    // Continue to the next middleware or route handler
    next();
  };
module.exports  = decodeUserMiddleware();  