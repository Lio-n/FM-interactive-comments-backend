import * as yup from "yup";
import { updateScore, updateComment } from "../../controllers";
import { validateCommentId, validateContent, validateSchema } from "../../validations/yup";

/* 
  ! Endpoint Seguro
  $ PATCH /comments/{commentId}/update
*/
const patchCommentContent = async (req, res) => {
  try {
    const bodyPromise = validateContent({ request: req.body });
    const paramsPromise = validateCommentId({ request: req.params });

    const [{ content }, { commentId }] = await Promise.all([bodyPromise, paramsPromise]);
    const userId = req._userId;

    await updateComment({ userId, content, commentId });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const querySchema = yup.object().shape({
  vote: yup.boolean().required(),
});
const patchCommentScore = async (req, res) => {
  try {
    const queryPromise = validateSchema({ schema: querySchema, request: req.query });
    const paramsPromise = validateCommentId({ request: req.params });

    const [{ commentId }, { vote }] = await Promise.all([paramsPromise, queryPromise]);

    await updateScore({ vote, commentId });

    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export { patchCommentContent, patchCommentScore };
