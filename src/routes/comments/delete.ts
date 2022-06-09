import { removeComment } from "../../controllers";
import { validateCommentId } from "../../validations/yup";

/* 
  ! Endpoint Seguro
  $ DELETE /comments/{comment_id}
*/
const deleteComment = async (req, res) => {
  try {
    const { commentId } = await validateCommentId({ request: req.params });
    const userId = req._userId;

    await removeComment({ userId, commentId });

    res.status(200).json({ isRemoved: true });
  } catch (err) {
    res.status(404).json({ err });
  }
};

export { deleteComment };
