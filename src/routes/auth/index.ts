import * as yup from "yup";
import { sendCode } from "../../controllers";

// $ POST /auth
const bodySchema = yup.object().shape({ email: yup.string().lowercase().trim().required() });
const postAuth = async (req, res) => {
  try {
    const { email } = await bodySchema.validate(req.body);
    const { message } = await sendCode(email); // * encontrar/crear un registro

    res.status(200).json({ message });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export { postAuth };
