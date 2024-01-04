import { WRITON, getData, postData } from ".";

export const postLogin = async ({ id, pw }: { id: string; pw: string }) => {
  const res = await WRITON.post("/user/login", {
    userIdentifier: id,
    userPassword: pw,
  });
  return res;
};
interface GetDuplicateId {
  code: number;
  message: string;
}
export const getDuplicateId = async (userId: string) => {
  const response = await getData<GetDuplicateId>(
    `/user/check-identifier?checkIdentifier=${userId}`
  );
  return response;
};

export const postEmail = async (email: string) => {
  const response = await postData("/user/signup/verify-email-code", { email });
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postEmailCode = async ({ email, emailCode }: any) => {
  const response = await postData("/user/signup/verify-email", {
    email: email,
    code: emailCode,
  });
  return response;
};
