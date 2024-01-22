const {sign, verify} = require("jsonwebtoken");
const createTokens = (user) => {
    const accessToken = sign({email: user.email, id: user.id, role: user.role}, "jwtsecret");
    
    return accessToken;
}
    const validateToken = (req, res, next) => {
        const accessToken = req.cookies["access-token"];
        if(!accessToken) return res.status(400).json({error: "User not Authenticated!"});
        try {
            const validToken = verify(accessToken, "jwtsecret");
            if(validToken){
                req.authenticated = true;
                return next();
            }
        }catch(err){
            return res.status(403).json({error: err});       
        }
    }
    const validateAdmin = (req, res, next) => {
        const accessToken = req.cookies["access-token"];
        try {
            const decodedToken = verify(accessToken, "jwtsecret");          
            if (decodedToken) {
              req.authenticated = true;
              if (decodedToken.role === 'admin') {
                req.isAdmin = true;
              }else {
                return res.redirect('/access-denied');
            }
              return next();
            }
        }catch (err){
            return res.status(403).redirect('/access-denied');
            }
    }
module.exports = {createTokens, validateToken, validateAdmin}
