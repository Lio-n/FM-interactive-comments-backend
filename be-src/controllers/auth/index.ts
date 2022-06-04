import { User, Auth } from "../../models";
import { generateToken, getExpirationDate, getRandomNum, sendCodeToEmail } from "../../lib";

// * Envía el código por email (usando sendgrid)
const sendCode = async (email: string): Promise<{ message }> => {
  const auth = await findOrCreateAuth(email);

  // * El codigo expira una vez transcurrido los 20 minutos ó una vez que este ya es utilizado
  const code = getRandomNum();
  const expires = getExpirationDate(); // * 20 minutes
  auth.update({ code, expires });

  await sendCodeToEmail({ email, code }); // * Sendgrid

  return { message: "Codígo enviado al email" };
};

const findOrCreateAuth = async (email: string): Promise<Auth> => {
  const cleanEmail = Auth.cleanEmail(email);

  const auth = await Auth.findOne({ where: { email: cleanEmail } });
  if (auth) return auth;

  return await createAuthAndUser(cleanEmail);
};

const createAuthAndUser = async (email: string): Promise<Auth> => {
  const user = await User.findByEmailOrCreate(email);

  const auth = await Auth.createNewAuth({ userId: user.getDataValue("id"), email });

  return auth;
};

const validateEmailAndCode = async ({ email, code }): Promise<string> => {
  const auth = await Auth.findOne({ where: { email } });
  if (!auth) throw "El email no esta registrado";

  auth.validateCode(code);
  const user_id = auth.getDataValue("user_id");

  return generateToken(user_id); // * Generate TOKEN
};

export { sendCode, validateEmailAndCode };
