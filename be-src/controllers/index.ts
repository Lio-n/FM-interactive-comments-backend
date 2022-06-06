// * Los controllers no se comunican de manera DIRECTA con la Base de datos.
import { getUserData, updateUserData } from "./user";
import { validateEmailAndCode, sendCode } from "./auth";
import { getAllComments, createComment, removeComment, getCommentById } from "./comment";

export {
  getUserData,
  sendCode,
  validateEmailAndCode,
  updateUserData,
  getAllComments,
  createComment,
  removeComment,
  getCommentById,
};
