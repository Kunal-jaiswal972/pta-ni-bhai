import { scrapeSign } from "../lib/scrapeSign.js";

export const getSign = async (req, res) => {
  const { text } = req.body;
  try {
    const sign = await scrapeSign(text);
    return res.status(200).json(sign);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("something went wrong");
  }
};
