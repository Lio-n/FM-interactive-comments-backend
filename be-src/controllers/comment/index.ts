import { Comment } from "../../models";
import Reply from "../../models/Reply";
import { CreateCommentParams } from "../../types/global";

const getComments = async () => {
  const promiseMain = await Comment.findAll({ where: { isReply: false } });
  const promiseReplies = await Comment.findAll({ where: { isReply: true } });

  const [repliesComments, mainComments] = await Promise.all([promiseReplies, promiseMain]);

  throw { mainComments, repliesComments };
};

const createComment = async ({ userId, content }: CreateCommentParams): Promise<Comment> => {
  const newComment = await Comment.createNewComment({ userId, content });
  return newComment;
};

const replyComment = async ({ content, userId, commentId }) => {
  const commentToReply = await Comment.verificateIfExists(commentId);
  const reply_id = commentToReply.getDataValue("reply");

  const newComment = await createComment({ userId, content });
  newComment.update({ isReply: true }); // Establezco que este comentario es una replica
  const newComment_id = newComment.getDataValue("id");

  // * Se crea en la Tabla "REPLY" un registro y se guarda el id en 'reply'
  if (!reply_id) {
    const post_id = commentToReply.getDataValue("id");

    const reply = await Reply.createNewReply({
      post_id,
      reply: newComment_id,
    });

    commentToReply.update({ reply });
    return true;
  }

  // * Contiene en 'reply' el id de la Tabla "REPLY"
  if (reply_id) {
    await Reply.updateReply({ reply_id, reply: newComment_id });
    return true;
  }
};

export { replyComment, createComment, getComments };
/* const removeComment = async ({
  userId,
  post_id,
}: {
  userId: string;
  post_id: string;
}): Promise<void> => {
  try {
    const comment = new Comment(post_id);
    await comment.removeComment(userId);
  } catch (err) {
    throw err;
  }
};

export { getComments, createComment, removeComment };
 */
