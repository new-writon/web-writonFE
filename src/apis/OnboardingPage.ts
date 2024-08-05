import { getData, postData } from ".";

//닉네임중복
export const getDuplicateNickname = async (organization: string, NickName: string | undefined) => {
  const response = await getData(`/auth/check/${organization}?nickname=${NickName}`);
  return response.data;
};

interface onBoardingDataProps {
  nickname: string;
  job: string;
  jobIntroduce: string;
  hireDate: string;
  company: string;
  companyPublic: boolean;
  organization: string;
}
export const postOnboardingComplete = async (onBoardingData: onBoardingDataProps) => {
  const response = await postData("/user/affiliation/enter", onBoardingData);
  return response.data;
};

export const postChallengeStart = async (organization: string, challengeId: string) => {
  const response = await postData("/user/challenge/start", { organization, challengeId });
  return response.data;
};

// {
//   nickname,
//   job,
//   jobIntroduce,
//   hireDate,
//   company,
//   companyPublic,
// }
