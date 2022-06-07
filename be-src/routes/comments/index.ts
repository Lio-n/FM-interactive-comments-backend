import { postComment } from "./create";
import { deleteComment } from "./delete";
import { getComment, getOneComment } from "./get";
import { postCommentReply } from "./reply";
import { patchCommentContent, patchCommentScore } from "./update";

export {
  postCommentReply,
  getComment,
  getOneComment,
  deleteComment,
  postComment,
  patchCommentContent,
  patchCommentScore,
};
