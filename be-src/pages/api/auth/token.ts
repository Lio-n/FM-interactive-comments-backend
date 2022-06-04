import { NextApiResponse } from "next";
import methods from "micro-method-router";
import * as yup from "yup";
import { schemaMiddleware } from "middleware";
import { validateEmailAndCode } from "controllers";

/* 
  $ POST /auth/token
  # Recibe un email y un código y valida que sean los correctos.
  # En el caso de que sean correctos, y que el código no esté vencido, devuelve un token e invalida el código.
*/
const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.number().positive().required(), // Transforma de string a number.
});

const postToken = async (res: NextApiResponse, { email, code }) => {
  try {
    const { token } = await validateEmailAndCode({ email, code });

    if (token) res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export default methods({
  post: schemaMiddleware({ schema: bodySchema, callback: postToken, request: "body" }),
});
