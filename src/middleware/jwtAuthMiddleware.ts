import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const config = process.env;

const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    const decodedToken = jwt.verify(token, config.TOKEN_KEY); 

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
}

module.exports = jwtAuthMiddleware;