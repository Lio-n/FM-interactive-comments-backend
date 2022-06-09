import { getAllComments, getCommentById } from "../../controllers";
import { validateCommentId } from "../../validations/yup";

// $ GET /comments
const getComments = async (req, res) => {
  try {
    const comments = await getAllComments();
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// $ GET /comments/{comment_id}
const getOneComment = async (req, res) => {
  try {
    const { commentId } = await validateCommentId({ request: req.params });

    const comment = await getCommentById(commentId);
    res.status(200).json({ comment });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export { getComments, getOneComment };
