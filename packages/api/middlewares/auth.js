const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Only authenticated users are allowed to perform this action');
  }
  next();
}
const hasMembership = [
  isAuthenticated,
  (req, res, next) => {
    if (!req.user.membership) {
      return res.status(403).send('A membership is required to perform this action');
    }
    next();
  },
];
const isAdmin = [
  isAuthenticated,
  (req, res, next) => {
    if (!req.user.admin) {
      return res.status(403).send('Only admins are allowed to perform this action');
    }
    next();
  }
]

module.exports = {
  isAuthenticated,
  hasMembership,
  isAdmin,
};