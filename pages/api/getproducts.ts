// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import connctDb from "../../middleware/connector";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

export default connctDb(handler);
