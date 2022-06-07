import { createComment } from "../../controllers";
import { validateContent } from "../../validations/yup";

/* 
  ! Endpoint Seguro
  $ POST /comments
*/
const postComment = async (req, res) => {
  try {
    const { content } = await validateContent({ request: req.body });

    await createComment({ userId: req._userId, content });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export { postComment };
