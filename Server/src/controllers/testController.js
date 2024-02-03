import { perkin } from "../config/constants.js";

export const test = async (req, res) => {
  return res.status(200).json({ news: perkin });
};
