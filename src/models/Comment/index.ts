import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { CommentData, CreateCommentParams } from "../../types/global";
import User from "../User";

class Comment extends Model {
  static async verificateIfExists(id: number): Promise<Comment> {
    const comment = await this.findByPk(id);
    if (!comment) throw "commentId doesn't exist";
    return comment;
  }
  static async createNewComment({ userId, content }: CreateCommentParams): Promise<Comment> {
    const user = await User.findByPk(userId);

    // # 'commentBase' : representa la estructura de cada Comment
    const commentBase: CommentData = {
      isEnable: true,
      isReply: false, // isReply ? es una respuesta : es un comentario "principal"
      posted_by: userId,
      full_name: user.getDataValue("full_name"),
      avatar_picture: user.getDataValue("avatar_picture"),
      content,
      score: 0,
      replies: [],
      created_at: new Date(),
    };

    const newComment = await this.create({ ...commentBase });
    return newComment;
  }
}

Comment.init(
  {
    isEnable: DataTypes.BOOLEAN,
    isReply: DataTypes.BOOLEAN,
    posted_by: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    avatar_picture: DataTypes.TEXT,
    content: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    replies: DataTypes.ARRAY(DataTypes.INTEGER),
    created_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "comment",
  }
);

export default Comment;
