import { finishModalType } from "@/types";

import { getData, putData } from ".";

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
