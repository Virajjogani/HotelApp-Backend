import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).send("Please enter valid Token!");
    req.user = user;
    next();
  });
};

export const verifyuser = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("authorization failed!");
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifytoken(req, res,next,() => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("authorization failed!");
    }
  });
};
