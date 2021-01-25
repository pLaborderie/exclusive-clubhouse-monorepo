const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Only authenticated users are allowed to perform this action');
  }
  next();
}

module.exports = {
  isAuthenticated,
};