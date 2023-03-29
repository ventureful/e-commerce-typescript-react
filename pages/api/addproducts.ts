// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import connctDb from "../../middleware/connector";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const pPromise = [];
      for (let i = 0; i < req.body.length; i += 1) {
        const p = new Product({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          available: req.body[i].available,
        });
        pPromise.push(p.save());
      }
      await Promise.all(pPromise);
      res.status(200).json({ result: "succss" });
    } catch (error) {
      // console.error(error);
      res.status(401).json({ result: "Account is Already created" });
    }
  } else {
    res.status(400).json({ msg: "This Method is not available!" });
  }
};

export default connctDb(handler);
