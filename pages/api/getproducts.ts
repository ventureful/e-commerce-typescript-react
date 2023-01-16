/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import connctDb from "../../middleware/connector";

export const arrangeCloths = (products: any[]) => {
  const cloths = products.reduce((acc: any, curr: any) => {
    if (acc[curr.title]) {
      if (!acc[curr.title].color.includes(curr.color) && curr.available > 0) {
        acc[curr.title].color.push(curr.color);
      }

      if (!acc[curr.title].size.includes(curr.size) && curr.available > 0) {
        acc[curr.title].size.push(curr.size);
      }
      acc[curr.title].available += curr.available;
    } else {
      acc[curr.title] = JSON.parse(JSON.stringify(curr));
      if (curr.available > 0) {
        acc[curr.title].color = [curr.color];
        acc[curr.title].size = [curr.size];
      } else {
        acc[curr.title].color = [];
        acc[curr.title].size = [];
      }
    }

    return acc;
  }, {});

  return cloths;
};

export const colorSizeSlug = (products: any[]) => {
  return products.reduce((acc: any, curr: any) => {
    if (acc[curr.color]) {
      acc[curr.color][curr.size] = { slug: curr.slug };
    } else {
      acc[curr.color] = {};
      acc[curr.color][curr.size] = { slug: curr.slug };
    }
    return acc;
  }, {});
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await Product.find();
  const tshirts = arrangeCloths(products);
  res.status(200).json({ products: tshirts });
};

export default connctDb(handler);
