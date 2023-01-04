// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number[]>
) {
  res
    .status(200)
    .json([738399, 829919, 791291, 829109, 629102, 401305, 401303]);
}
