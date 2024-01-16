import { ChallengeCurrentType } from "@/types";

import { getData, postData } from ".";

// 매안페이지 챌린지 현황 젤 위에 컴포넌트
export const getChallengeCurrent = async (organization: string, challengeId: string) => {
  const response = await getData<ChallengeCurrentType>(
    `/challenge/record/present-situation/${organization}/${challengeId}`
  );
  return response.data;
};
