// Authentication middleware

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("heeeee> ",token)
  
    // Check if a token is provided
    if (!token) {
      console.log('Token missing');
      return res.status(401).json({
        status: 'FAILED',
        message: 'Authentication required',
      });
    }
  
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET,{ algorithms: ['HS256'] });
      // Attach the decoded user information to the request
      req.user = decoded;
      
      // Continue with the next middleware or route handler
      return next();
    } catch (error) {
      console.log('Token verification failed:', error);
      return res.status(401).json({
        status: 'FAILED',
        message: 'Invalid token',
      });
    }
  };




module.exports = authMiddleware;