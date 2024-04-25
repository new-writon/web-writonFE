import { finishModalType, satisfactionQuestionType } from "@/types";

import { getData, patchData, postData, putData } from ".";

//마지막 프로세스 했는지 조회
export const getFinishModal = async (organization: string, challengeId: string) => {
  const response = await getData<{ review: number }>(
    `/challenge/end/${organization}/${challengeId}/review`
  );
  return response.data;
};

//마지막 프로세스 클릭
export const putFinishModal = async (organization: string, challengeId: string) => {
  const response = await putData(`/challenge/end/${organization}/${challengeId}/review`);
  return response.data;
};

//마지막 프로세스에 들어가는 데이터 조회
export const getFinishModalData = async (organization: string, challengeId: string) => {
  const response = await getData<finishModalType>(`/challenge/end/${organization}/${challengeId}`);
  return response.data;
};

//만족도 조사 질문
export const getSatisfactionData = async (challengeId: string) => {
  const response = await getData<satisfactionQuestionType[]>(`/satisfaction/${challengeId}`);
  return response.data;
};

//만족도 조사 객관식 질문 응답
export const postSatisfactionObjectiveData = async (
  organization: string,
  challengeId: string,
  satisfationAnswer: { satisfactionId: number; score: number | undefined }[] | undefined
) => {
  const response = await postData("/satisfaction/objective-question", {
    organization: organization,
    challengeId: challengeId,
    satisfationAnswer: satisfationAnswer,
  });
  return response.data;
};

//재참여 조사 질문 조회
export const getReEngagementData = async (challengeId: string) => {
  const response = await getData<{ restart: number }>(`/satisfaction/${challengeId}/re-engagement`);
  return response.data;
};

//재참여 조사 답변
export const patchReEngagementData = async (
  organization: string,
  challengeId: string,
  check: boolean
) => {
  const response = await patchData("/satisfaction/re-engagement", {
    organization: organization,
    challengeId: challengeId,
    check: check,
  });
  return response.data;
};
