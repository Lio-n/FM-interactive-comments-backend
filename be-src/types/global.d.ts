// * Estos types son importantes, porque son utilizados por los endpoint que estan protegidos.
// * Osea, los que requieren el Token.
type CustomEndpoint = {
  req: Request;
  res: Response;
};

// # Classes Type
type UserData = {
  comments: number[]; // Almacena los id de los comentario realizados
  created_at: Date;
  email: string;
  // * ↓ Estas propiedades son posibles actulizar por el user.
  full_name: string;
  avatar_picture: string; // url : base64
};

type AuthData = {
  email: string;
  user_id: number;
  code: number;
  expires: Date;
};

type CommentData = {
  isEnable: boolean; // isEnable ? removido : conserva
  isReply: boolean;
  posted_by: number;
  content: string;
  full_name: string;
  avatar_picture: string; // url : base64
  score: number;
  replies: number[]; // Almacena un solo id de la Tabla Reply
  created_at: Date;
};

type ReplyData = {
  post_id: number;
  replies: number[]; // Almacena los id de las replicas que obtuvo este comentario
};

type CreateCommentParams = {
  userId: number;
  content: string;
};
type ReplyCommentParams = CreateCommentParams & { commentId: number };
type UpdateCommentParams = ReplyCommentParams;
type RemoveCommentParams = Omit<ReplyCommentParams, "content">;
type UpdateScoreParams = Pick<ReplyCommentParams, "commentId"> & { vote: boolean };

export {
  CustomEndpoint,
  UserData,
  AuthData,
  CommentData,
  ReplyData,
  CreateCommentParams,
  ReplyCommentParams,
  RemoveCommentParams,
  UpdateCommentParams,
  UpdateScoreParams,
};
