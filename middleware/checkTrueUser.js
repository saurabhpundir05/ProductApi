// this middleware is for deleting user id .
// it only allows the login user to delete its own id, not others .
function checkUser(req, res, next) {
  const authUser = req.user;
  const { id } = req.body;
  if (!authUser || !id) {
    return res.status(400).json({ message: "Invalid user data" });
  }
  if (String(authUser.id) !== String(id)) {
    return res.status(403).json({ message: "Can't delete other user data" });
  }
  return next();
}

module.exports = checkUser;
