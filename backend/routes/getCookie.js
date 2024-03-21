import jwt from "jsonwebtoken";

const getCookie = (req, res, next) => {
  res.cookie("authorization", "haha").status(200).send("oke");
};

export default getCookie;
