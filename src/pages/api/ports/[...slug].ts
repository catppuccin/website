import { NextApiRequest, NextApiResponse } from "next";
import getPorts from "../../../lib/getPorts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  const ports = await getPorts();
  res.status(200).json(ports);
}
