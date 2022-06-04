import methods from "micro-method-router";
import { authMiddleware } from "middleware";
import { getUserData, updateUserData } from "controllers";
import * as yup from "yup";

/*  
  $ GET /me
  # Devuelve info del user asociado a ese token
*/
const getMe = async ({ res, userId }: CustomEndpointWithoutReq) => {
  try {
    const userData = await getUserData(userId);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const bodySchema = yup
  .object()
  .shape({
    avatar_picture: yup.string(), // url : base64
    full_name: yup.string(),
  })
  .noUnknown(true)
  .strict();
/*  
  $ PATCH /me
  # Permite modificar algunos datos del usuario al que pertenezca el token.
*/
const patchMe = async ({ req, res, userId }: CustomEndpoint) => {
  try {
    const data = await bodySchema.validate(req.body);
    const message = await updateUserData({ data, userId });
    res.status(200).json({ message });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

export default methods({
  get: authMiddleware(getMe),
  patch: authMiddleware(patchMe),
});
