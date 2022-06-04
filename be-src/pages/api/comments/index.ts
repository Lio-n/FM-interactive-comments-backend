import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "middleware";
import { createComment, getComments } from "controllers";
import * as yup from "yup";

/* 
  $ GET /comments
  # Retorna todos los commentarios realizados
*/
const getComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const comments = await getComments();
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

/* 
  ! Endpoint Seguro
  $ POST /comments
  # Crea un comentario.
  # recibe 'userId' y el campo 'content' para crea un comentario
*/
const bodySchema = yup.object().shape({
  content: yup.string().max(255),
});
const postComment = async ({ req, res, userId }) => {
  try {
    const { content } = await bodySchema.validate(req.body);
    const isCreated: boolean = await createComment({ userId, content });

    res.status(200).json({ isCreated });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

export default methods({
  get: getComment,
  post: authMiddleware(postComment),
});
