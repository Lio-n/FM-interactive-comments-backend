import "dotenv/config";

import * as path from "path";
import * as express from "express";
import * as cors from "cors";
import { getWelcome } from "./routes/welcome";
import { postAuth } from "./routes/auth";
import { postToken } from "./routes/auth/token";
import { authMiddleware } from "./middleware/token";
import { getMe, patchMe } from "./routes/me";
import { getComment, getOneComment, postComment } from "./routes/comments";
import { postCommentReply } from "./routes/comments/reply";

const app = express();

app.use(cors());
app.use(express.json({ limit: "75mb" }));
app.use(express.static("fe-dist"));

const port = process.env.PORT || 3000;

// ## ヾ(●ω●)ノ ##

// $ Welcome.
app.get("/welcome", async (req, res) => {
  getWelcome(req, res);
});

/* 
  $ POST /auth
  # Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.
*/
app.post("/auth", postAuth);

/* 
  $ POST /auth/token
  # Recibe un email y un código y valida que sean los correctos.
  # En el caso de que sean correctos, y que el código no esté vencido, devuelve un token e invalida el código.
*/
app.post("/auth/token", postToken);

/* 
  $ GET /comments
  # Retorna todos los commentarios realizados
*/
app.get("/comments", getComment);

/* 
  $ GET /comments/{comment_id}
  # Recupera un comentario.
  # recibe 'comment_id' para recuperar un comentario
*/
app.get("/comments/:commentId", getOneComment);

// ! Below here need a TOKEN : Authorization: `bearer ${TOKEN}`

/* 
  $ GET /me
  # Devuelve info del user asociado a ese token
*/
app.get("/me", authMiddleware, getMe);

/* 
  $ PATCH /me
  # Permite modificar algunos datos del usuario al que pertenezca el token.
*/
app.patch("/me", authMiddleware, patchMe);

/* 
  ! Endpoint Seguro
  $ POST /comments
  # Crea un comentario.
  # recibe 'userId' y el campo 'content' para crea un comentario
*/
app.post("/comments", authMiddleware, postComment);

/* 
  ! Endpoint Seguro
  $ POST /comments/{comment_id}/reply
  # Replica un comentario.
  # recibe 'userId' y 'comment_id' para replicar un comentario
*/
app.post("/comments/:commentId/reply", authMiddleware, postCommentReply);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../fe-dist/index.html"));
// });

app.listen(port, () => {
  console.table({ message: "Server listen on port", port });
});
