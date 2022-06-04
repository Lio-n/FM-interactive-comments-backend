import * as yup from "yup";
import { createComment, getComments } from "../../controllers";
import { validateSchema } from "../../validations/yup";

const getComment = async (req, res) => {
  try {
    const comments = await getComments();
    res.status(200).json({ comments });
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

export { postComment, getComment };
