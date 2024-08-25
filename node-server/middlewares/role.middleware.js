export class roleMiddleware {
  // Add a middleware function to check if the user is an admin
  static isAdmin(req, res, next) {
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not an admin." });
    }
    next();
  }
}
