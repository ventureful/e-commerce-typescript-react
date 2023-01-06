/* eslint-disable no-underscore-dangle */
/* eslint-disable security/detect-object-injection */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import connctDb from "../../middleware/connector";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const pPromise = [];
    for (let i = 0; i < req.body.length; i += 1) {
      pPromise.push(Product.findByIdAndUpdate(req.body[i]._id, req.body[i]));
    }
    await Promise.all(pPromise);
    res.status(200).json({ result: "succss" });
  } else {
    res.status(400).json({ msg: "This method is not available" });
  }
};

export default connctDb(handler);
