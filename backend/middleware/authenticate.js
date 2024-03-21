import jwt from "jsonwebtoken";

const authenticateMiddleware = (req, res, next) => {
  const token = req.cookies.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "unauthorized" });
      } else {
        req.user = decoded;

        next();
      }
    });
  } else {
    return res.status(401).send({ message: "unauthorized" });
  }
};

export default authenticateMiddleware;
