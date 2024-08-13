import { finishModalType, satisfactionQuestionType } from "@/types";

import { getData, patchData, postData, putData } from ".";

//마지막 프로세스 했는지 조회
export const getFinishModal = async (organization: string, challengeId: string) => {
  const response = await getData<{ review: number }>(
    `/satisfaction/${organization}/${challengeId}`
  );
  return response.data;
};

//마지막 프로세스 클릭
export const putFinishModal = async (organization: string, challengeId: string) => {
  const response = await putData(`/satisfaction/${organization}/${challengeId}`);
  return response.data;
};

//마지막 프로세스에 들어가는 데이터 조회
export const getFinishModalData = async (organization: string, challengeId: string) => {
  const response = await getData<finishModalType>(
    `/satisfaction/result/${organization}/${challengeId}`
  );
  return response.data;
};

//만족도 조사 질문
export const getSatisfactionData = async (challengeId: string) => {
  const response = await getData<satisfactionQuestionType[]>(
    `/satisfaction/question/${challengeId}`
  );
  return response.data;
};

//만족도 조사 객관식 질문 응답
export const postSatisfactionObjectiveData = async (
  organization: string,
  challengeId: string,
  satisfactionAnswer: { satisfactionId: number; score: number | undefined }[] | undefined
) => {
  const response = await postData("/satisfaction/response/objective-question", {
    organization: organization,
    challengeId: challengeId,
    satisfactionAnswer: satisfactionAnswer,
  });
  return response.data;
};

//재참여 조사 질문 조회
export const getReEngagementData = async (challengeId: string) => {
  const response = await getData<{ restart: number }>(`/satisfaction/re-engagement/${challengeId}`);
  return response.data;
};

//재참여 조사 답변
export const patchReEngagementData = async (
  organization: string,
  challengeId: string,
  check: boolean
) => {
  const response = await patchData("/satisfaction/response/re-engagement", {
    organization: organization,
    challengeId: challengeId,
    check: check,
  });
  return response.data;
};
