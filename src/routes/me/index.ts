import * as yup from "yup";
import { getUserData, updateUserData } from "../../controllers";
import { validateSchema } from "../../validations/yup";

// $ GET /me
const getMe = async (req, res) => {
  try {
    const userId: number = req._userId;
    const userData = await getUserData(userId);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const bodySchema = yup
  .object()
  .shape({
    avatar_picture: yup.string().when(["full_name"], {
      is: (full_name) => full_name,
      then: yup.string(),
      otherwise: yup.string().required("At least 'avatar_picture' or 'full_name' are required"),
    }), // url : base64
    full_name: yup.string(),
  })
  .noUnknown(true)
  .strict();

// $ PATCH /me
const patchMe = async (req, res) => {
  try {
    const data = await validateSchema({ schema: bodySchema, request: req.body });

    const message = await updateUserData({ data, userId: req._userId });
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export { getMe, patchMe };
