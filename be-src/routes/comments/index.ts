import * as yup from "yup";
import { createComment, getAllComments } from "../../controllers";
import { getCommentById } from "../../controllers/comment";
import { validateSchema } from "../../validations/yup";

const getComment = async (req, res) => {
  try {
    const comments = await getAllComments();
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getOneComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) throw "comment_id is required";

    const comment = await getCommentById(commentId);
    res.status(200).json({ comment });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const bodySchema = yup.object().shape({
  content: yup.string().max(255).required(),
});
const postComment = async (req, res) => {
  try {
    const { content } = await validateSchema({ schema: bodySchema, request: req.body });
    await createComment({ userId: req._userId, content });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export { postComment, getComment, getOneComment };
