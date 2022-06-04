import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { ReplyData } from "../../types/global";

class Reply extends Model {
  static async createNewReply({ post_id, reply }): Promise<number> {
    // # 'replyBase' : representa la estructura de cada Reply
    const replyBase: ReplyData = {
      post_id,
      replies: [reply],
    };

    const reply_table = await this.create({ ...replyBase });
    return reply_table.getDataValue("id");
  }

  static async updateReply({
    reply_id,
    reply,
  }: {
    reply_id: number;
    reply: number;
  }): Promise<void> {
    const reply_table = await this.findByPk(reply_id);

    let replies = reply_table.get("replies") as Array<number>;

    await reply_table.update({ replies: [...replies, reply] });
  }
}

Reply.init(
  {
    post_id: DataTypes.INTEGER,
    replies: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  {
    sequelize,
    modelName: "reply",
  }
);

export default Reply;
