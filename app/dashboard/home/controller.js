import User from "../../user/model.js";
import Pregnant from "../../pregnant/model.js";

export const getHome = async (req, res) => {
  const users = await User.find();
  const pregnants = await Pregnant.find();
  res.status(200).json({ users: users.length, pregnants: pregnants.length });
};
