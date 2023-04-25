const jwt = require('jsonwebtoken')
const Auth = require('../models/authModel')

const requireAuth = async (req, res, next) => {
  try {
    // extract the access token from the authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // if there's no token, return an error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find the user with the decoded user ID
    const user = await Auth.findById(decoded.userId);

    // if the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // add the user object to the request object for future use
    req.user = user;

    // continue to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const requireAuthAndAuthorization = async (req, res, next) => {
  try {
    await requireAuth(req, res, async () => {
      const userId = req.user._id.toString()
      const { id } = req.params

      if (userId === id || req.user.isAdmin) {
        next()
      } else {
        res.status(403).json({ error: 'Unauthorized access' })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const requireAuthAndAdmin = async (req, res, next) => {
  try {
    await requireAuth(req, res, async () => {
      console.log(req.user)
      if (req.user && req.user.isAdmin) {
        next()
      } else {
        res.status(403).json({ error: 'You do not have access to perform this action' })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


module.exports = {requireAuth, requireAuthAndAuthorization, requireAuthAndAdmin}