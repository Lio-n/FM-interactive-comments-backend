import { NextApiResponse } from "next";
import * as yup from "yup";
import methods from "micro-method-router";
import { sendCode } from "controllers";
import { schemaMiddleware } from "middleware";

/* 
  $ POST /auth
  # Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.
*/
const bodySchema = yup.object().shape({ email: yup.string().email().required() });

const postAuth = async (res: NextApiResponse, { email }) => {
  try {
    const { message } = await sendCode(email); // * encontrar/crear un registro
    res.status(200).send({ message });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default methods({
  post: schemaMiddleware({ schema: bodySchema, callback: postAuth, request: "body" }),
});
