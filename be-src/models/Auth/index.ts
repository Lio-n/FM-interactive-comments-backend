import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { isEqual } from "lodash";
import { isCodeExpired } from "../../lib";
import { AuthData } from "../../types/global";

class Auth extends Model {
  static cleanEmail = (email: string): string => {
    return email.trim().toLocaleLowerCase();
  };

  validateCode(code: number): void {
    const authCode = this.getDataValue("code");
    const authExpires = this.getDataValue("expires");

    if (!isEqual(authCode, code)) throw "El codigo no es valido";
    if (isCodeExpired(authExpires)) throw "El tiempo ha expirado";

    // this.update({ code: null }); // * Invalida el codigo
  }

  static async createNewAuth({ userId, email }): Promise<Auth> {
    // # 'authBase' : representa la estructura de cada Auth
    const authBase: AuthData = {
      email,
      code: null,
      expires: null,
      user_id: userId,
    };
    // * Auth
    const auth = await this.create({ ...authBase });
    return auth;
  }
}

Auth.init(
  {
    email: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    expires: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "auth",
  }
);

export default Auth;
