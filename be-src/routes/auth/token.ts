import * as yup from "yup";
import { validateEmailAndCode } from "../../controllers";
import { validateSchema } from "../../validations/yup";

const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.number().positive().required(), // Transforma de string a number.
});

const postToken = async (req, res) => {
  try {
    const { email, code } = await validateSchema({ schema: bodySchema, request: req.body });

    const token = await validateEmailAndCode({ email, code });

    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export { postToken };
