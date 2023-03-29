// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";
import connctDb from "../../middleware/connector";
import User from "../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;
      const user = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.ENCRYPTION_DECRYPTION_KEY || ""
        ).toString(),
      });
      user.save();
      res.status(200).json({ result: "succss" });
    } catch (error) {
      res.status(401).json({ msg: "Account Already Created" });
    }
  } else {
    res.status(400).json({ msg: "This Method is not available!" });
  }
};

export default connctDb(handler);
