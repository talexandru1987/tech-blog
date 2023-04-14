const auth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    console.log(`[INFO]: User ${req.session.user.username} is in session`);
    return next();
  }

  return res.redirect("/login");
};

module.exports = auth;
