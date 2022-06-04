import methods from "micro-method-router";
import { authMiddleware } from "middleware";
import { removeComment } from "controllers";

/* 
  ! Endpoint Seguro
  $ DELETE /comments/[post_id]
  # Elimina un comentario, pero si este tiene "Replicas" son se las elimina.
  # recibe 'userId' y la query 'post_id'.
*/
const deleteComment = async ({ req, res, userId }) => {
  try {
    const { post_id } = req.query;

    await removeComment({ userId, post_id });

    res.status(200).json({ isRemoved: true });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default methods({
  delete: authMiddleware(deleteComment),
});
