import { Comment } from "../../models";
import { CreateCommentParams } from "../../types/global";
import { isAValidArray } from "../../validations";

const getCommentById = async (comment_id) => await Comment.verificateIfExists(comment_id);

const getAllComments = async (): Promise<Comment[]> => {
  const promiseMain = await Comment.findAll({ where: { isReply: false } });
  const promiseReplies = await Comment.findAll({ where: { isReply: true } });

  const [repliesComments, mainComments] = await Promise.all([promiseReplies, promiseMain]);

  const getReplies = (replies_id: number[]) => {
    return repliesComments.filter((reply) => {
      const reply_id = reply.getDataValue("id");
      if (replies_id.includes(reply_id)) return reply;
    });
  };

  const getDeepReplies = (arrReply): Comment[] => {
    return arrReply.filter((reply) => {
      let replies_id = reply.getDataValue("replies");

      if (isAValidArray(replies_id)) {
        const deepReplies = getReplies(replies_id);
        reply.replies = deepReplies;
        return reply;
      }

      return reply;
    });
  };

  const allComments = mainComments.map((comment) => {
    let replies_id: number[] = comment.getDataValue("replies");
    const mainComment: any = comment;

    if (isAValidArray(replies_id)) {
      // 2 nivel
      const replies = getReplies(replies_id);
      // 3 nivel
      const deepReplies = getDeepReplies(replies);

      mainComment.replies = deepReplies;
      return mainComment;
    }

    return mainComment;
  });

  return allComments;
};

const createComment = async ({ userId, content }: CreateCommentParams): Promise<Comment> =>
  await Comment.createNewComment({ userId, content });

const replyComment = async ({ content, userId, commentId }) => {
  const commentToReply = await Comment.verificateIfExists(commentId);
  const replies_ids = commentToReply.getDataValue("replies");

  // Create new comment
  const newComment = await createComment({ userId, content });
  newComment.update({ isReply: true }); // Establezco que este comentario es una replica
  const newComment_id = newComment.getDataValue("id");

  commentToReply.update({ replies: [...replies_ids, newComment_id] });
  return true;
};

export { replyComment, createComment, getAllComments, getCommentById };
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
