import { getData } from ".";

//닉네임중복
export const getDuplicateNickname = async (organization: string, NickName: string) => {
  const response = await getData(`/challenge/start/check/${organization}?nickname=${NickName}`);
  return response.data;
};
