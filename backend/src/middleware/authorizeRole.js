module.exports = function authorizeRole(...roles) {
  return (req, res, next) => {
    const role = req.header('x-role');
    if (!roles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden for this role' });
    }
    return next();
  };
};
