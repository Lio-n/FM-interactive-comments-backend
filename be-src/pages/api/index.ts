/*  
  # Los enpoints en general no utilizan directamente las Clases de los modelos.
  # Estos enpoints solo se comunican con los controllers.
*/
import { NextApiResponse } from "next";
export default (res: NextApiResponse) => {
  res.status(418).send("Bienvenido");
};
