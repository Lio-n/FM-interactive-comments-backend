import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { UserData } from "../../types/global";

class User extends Model {
  static async findByEmailOrCreate(email: string): Promise<User> {
    // # 'userBase' : representa la estructura de cada User
    const userBase: UserData = {
      email,
      full_name: null,
      avatar_picture: null,
      comments: [],
      created_at: new Date(),
    };
    // * User
    const [user] = await this.findOrCreate({
      where: { email },
      defaults: { ...userBase },
    });
    return user;
  }
}

User.init(
  {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar_picture: DataTypes.TEXT,
    comments: DataTypes.ARRAY(DataTypes.INTEGER),
    created_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
