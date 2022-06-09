import "dotenv/config";

import * as express from "express";
import * as cors from "cors";
import { authMiddleware } from "./middleware/token";

// $ Routes
import { getWelcome } from "./routes/welcome";
import { postAuth } from "./routes/auth";
import { postToken } from "./routes/auth/token";
import { getMe, patchMe } from "./routes/me";
import * as commentCtrl from "./routes/comments";

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
app.get("/comments", commentCtrl.getComments);

/* 
  $ GET /comments/{commentId}
  # Recupera un comentario.
  # recibe 'commentId' para recuperar un comentario
*/
app.get("/comments/:commentId", commentCtrl.getOneComment);

// ! Below here need a TOKEN : Authorization: `bearer ${TOKEN}`

/* 
  ! Endpoint Seguro
  $ GET /me
  # Devuelve info del user asociado a ese token
*/
app.get("/me", authMiddleware, getMe);

/* 
  ! Endpoint Seguro
  $ PATCH /me
  # Permite modificar algunos datos del usuario al que pertenezca el token.
*/
app.patch("/me", authMiddleware, patchMe);

/* 
  ! Endpoint Seguro
  $ POST /comments
  # Crea un comentario.
  # recibe token y el campo 'content' para crea un comentario
*/
app.post("/comments", authMiddleware, commentCtrl.createComment);

/* 
  ! Endpoint Seguro
  $ POST /comments/{commentId}/reply
  # Replica un comentario.
  # recibe token y 'commentId' para replicar un comentario
*/
app.post("/comments/:commentId/reply", authMiddleware, commentCtrl.replyComment);

/* 
  ! Endpoint Seguro
  $ DELETE /comments/{commentId}
  # Elimina un comentario, pero si este tiene "Replicas" no se las elimina.
  # recibe 'token' y 'commentId' para eliminar un comentario.
*/
app.delete("/comments/:commentId", authMiddleware, commentCtrl.deleteComment);

/* 
  ! Endpoint Seguro
  $ PATCH /comments/{commentId}/update
  # Edita un comentario propio.
  # recibe 'token', 'commentId' y 'content' para editar comentario.
*/
app.patch("/comments/:commentId/update", authMiddleware, commentCtrl.updateContent);

/* 
  ! Endpoint Seguro
  $ PATCH /comments/{commentId}/vote?vote=upvote | downvote
  # Edita el score de un comentario.
  # recibe 'token', 'commentId' y 'score' para editar el score de un comentario.
*/
app.patch("/comments/:commentId/vote", authMiddleware, commentCtrl.updateScore);

app.listen(port, () => {
  console.table({ message: "Server listen on port", port });
});
