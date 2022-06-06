/* import { firestore } from "lib";
import Base from "models/base_class";
import { User } from "models";

const coll = firestore.collection("comment");
class Comment extends Base {
  constructor(id: string) {
    super({ id, ref: coll.doc(id) });
  }
  async removeComment(userId: string) {
    await this.pull();
    if (this.data.posted_by !== userId) throw "Este post no es propiedad de este user";

    this.data.isEnable = false;
    this.push();
  }
  static async getComments(): Promise<CommentData[]> {
    const snapshot = await coll.get();
    const comments = await snapshot.docs.map((doc) => doc.data());
    return comments as CommentData[];
  }
  static async createNewComment({ userId, content }: { userId: string; content: string }) {
    const user = new User(userId);
    await user.exists();
    await user.pull();
    // * 'commentBase' : representa la estructura de cada Comment
    const commentBase: CommentData = {
      isEnable: true,
      posted_by: userId,
      full_name: user.data.full_name,
      avatar_picture: user.data.avatar_picture,
      content,
      score: 0,
      reply: null,
      created_at: new Date(),
    };
    const { id } = await coll.add(commentBase);
    // * El span no contiene la data solo el Id.
    user.setNewComment(id);

    return id;
  }
}

export default Comment;
 */
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

    // * 'commentBase' : representa la estructura de cada Comment
    const commentBase: CommentData = {
      isEnable: true,
      isReply: false, // isReply ? es una replica : es un comentario "principal"
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
