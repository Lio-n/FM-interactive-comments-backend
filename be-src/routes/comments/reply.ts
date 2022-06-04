import * as yup from "yup";
import { replyComment } from "../../controllers/comment";
import { validateSchema } from "../../validations/yup";

const bodySchema = yup.object().shape({
  content: yup.string().max(255).required(),
});
const postCommentReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) throw "comment_id is required";
    const userId = req._userId;

    const { content } = await validateSchema({ schema: bodySchema, request: req.body });
    await replyComment({ content, userId, commentId });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
export { postCommentReply };
