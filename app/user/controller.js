import dotenv from "dotenv";
dotenv.config();
import User from "./model.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    if (user.noHp === "082155611094") {
      user.role = "Bidan";
      const newUser = new User(user);
      await newUser.save();
      res.status(200).json({ message: "User berhasil dibuat" });
    } else {
      const avail = await User.findOne({ noHp: user.noHp });
      if (avail) {
        await User.findOneAndUpdate({ noHp: avail.noHp }, user);
        res.status(200).json({ message: "User berhasil dibuat" });
      } else {
        res.status(404).json({ errorMessage: "Anda tidak memiliki akses" });
      }
    }
  } catch (error) {
    if (error)
      res.status(500).json({ errorMessage: error || "Internal server error" });
  }
};

export const createKader = async (req, res) => {
  const kader = req.body;
  try {
    const avail = await User.findOne({ noHp: kader.noHp });
    if (avail) {
      res.status(404).json({ errorMessage: "Nomor sudah digunakan" });
    } else {
      const newKader = new User(kader);
      await newKader.save();
      res.status(200).json({ message: "Tiket dibuat" });
    }
  } catch (error) {
    if (error)
      res.status(500).json({ errorMessage: error || "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { noHp, password } = req.body;
  try {
    const userValid = await User.findOne({ noHp });
    if (!userValid) {
      res.status(404).json({ errorMessage: "Nomor tidak terdaftar" });
    } else {
      if (userValid.password !== password) {
        res.status(401).json({ errorMessage: "Password salah" });
      } else {
        const refreshToken = jwt.sign(
          {
            id: userValid._id,
            name: userValid.name,
            role: userValid.role,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        await User.findOneAndUpdate({ _id: userValid._id }, { refreshToken });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          // secure: true,
        });
        res.json({ refreshToken });
      }
    }
  } catch (error) {
    if (error)
      res.status(500).json({ errorMessage: error || "Internal server error" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(204);
  await User.findOneAndUpdate({ _id: user._id }, { refreshToken: null });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const getToken = async (req, res) => {
  try {
    // const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) return res.sendStatus(401);
    // const user = await User.findOne({ refreshToken });
    // if (!user) return res.sendStatus(403);
    // jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   (err, decode) => {
    //     if (err) return res.sendStatus(403);
    //     res.json(decode);
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
};

export const getAllKader = async (req, res) => {
  try {
    let kaders = await User.find({ role: "Kader" });
    kaders = kaders.map((kader) => {
      return {
        _id: kader._id,
        name: kader.name,
        noHp: kader.noHp,
        password: "*****",
      };
    });
    res.status(200).json({ data: kaders });
  } catch (error) {
    if (error) {
      res.status(500).json({ errorMessage: error || "Internal server error" });
    }
  }
};
