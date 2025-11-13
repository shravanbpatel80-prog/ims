// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

// Get JWT_SECRET at runtime to ensure it's loaded from .env
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('❌ JWT_SECRET is not set in environment variables');
    console.error('💡 Check .env file in edims-backend directory');
  }
  return secret;
};

// --- 1. Main Authentication Middleware ---
export const protect = async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer <token>" -> "<token>")
      token = req.headers.authorization.split(' ')[1];
      
      console.log('🔐 Token received for:', req.path);
      console.log('Token (first 20 chars):', token ? token.substring(0, 20) + '...' : 'none');

      // Get JWT_SECRET at runtime
      const JWT_SECRET = getJWTSecret();
      
      if (!JWT_SECRET) {
        console.error('❌ JWT_SECRET is not configured');
        return res.status(500).json({ 
          message: 'Server configuration error',
          error: 'JWT_SECRET is not configured. Please check backend .env file.'
        });
      }

      console.log('JWT_SECRET exists:', !!JWT_SECRET);
      console.log('JWT_SECRET (first 5 chars):', JWT_SECRET.substring(0, 5) + '...');

      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('✅ Token verified successfully for user:', decoded.username);

      // Attach the user's info to the request object
      // We can now access `req.user` in any protected route
      req.user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };

      // Continue to the next function (the controller)
      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      console.error('Error name:', error.name);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
      }
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token provided
    console.warn('⚠️ No Authorization header found for:', req.path);
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// --- 2. Role-Checking Middleware ---
// This is a *second* middleware we can use *after* `protect`
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized, Admin role required' });
  }
};