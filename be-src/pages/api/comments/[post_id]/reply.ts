import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

const postComment = async (req: NextApiRequest, res: NextApiResponse) => {};

export default methods({
  post: postComment,
});
