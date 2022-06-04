import { User } from "../../models";

const getUserData = async (userId: number): Promise<User> => {
  const user = await User.findByPk(userId);
  if (!user) throw "User id doesn't exist";
  return user;
};

type UpdateUserDataParams = {
  userId: number;
  data: {
    full_name?: string;
    avatar_picture?: string;
  };
};
const updateUserData = async ({ data, userId }: UpdateUserDataParams): Promise<string> => {
  const user = await User.findByPk(userId);
  user.update({ ...data });
  return "User data updated";
};

export { updateUserData, getUserData };
