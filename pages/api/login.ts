// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import connctDb from "../../middleware/connector";
import User from "../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        const { name, email } = user;

        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.ENCRYPTION_DECRYPTION_KEY || ""
        );
        const password = bytes.toString(CryptoJS.enc.Utf8);

        if (req.body.email === email && req.body.password === password) {
          const token = jwt.sign(
            { name, email },
            process.env.JWT_SECRET_KEY || "",
            {
              expiresIn: "2d",
            }
          );

          res.status(200).json({ success: true, token });
        } else {
          res.status(500).json({ success: false, error: "Wrong Credentials" });
        }
      } else {
        res.status(404).json({ success: false, error: "No user found" });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: "User Not Found" });
    }
  }
};

export default connctDb(handler);
