import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../user/model.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.noHp = decode.noHp;
    next();
  });
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        res.json({
          id: decode._id,
          name: decode.name,
          role: decode.role,
          exp: decode.exp,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
