const adminOnly = (req, res, next) => {
  const role = req.user?.role || req.body?.role;
  if (role === 'Admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
};

export default adminOnly;


