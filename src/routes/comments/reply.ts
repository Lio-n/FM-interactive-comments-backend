import { replyComment } from "../../controllers/comment";
import { validateCommentId, validateContent } from "../../validations/yup";

/* 
  ! Endpoint Seguro
  $ POST /comments/{comment_id}/reply
*/
const postCommentReply = async (req, res) => {
  try {
    const bodyPromise = validateContent({ request: req.body });
    const paramsPromise = validateCommentId({ request: req.params });

    const [{ content }, { commentId }] = await Promise.all([bodyPromise, paramsPromise]);
    const userId = req._userId;

    await replyComment({ content, userId, commentId });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export { postCommentReply as replyComment };
