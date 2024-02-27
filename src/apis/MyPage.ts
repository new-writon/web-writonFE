import {
  accountNumberProps,
  communityContentProps,
  myPageProps,
  myProfileEditProps,
} from "@/types";

import { getData, patchData, putData } from ".";

//마이페이지 내 정보 조회
export const getMyPageData = async (organization: string) => {
  const response = await getData<myPageProps>(`/user/${organization}/my-profile`);
  return response.data;
};

// 마이페이지 프로필 정보 수정
export const putMyPageData = async (organization: string, editData: myProfileEditProps) => {
  const response = await putData(`/user/${organization}/my-profile`, editData);
  return response.data;
};

//계좌번호
export const patchAccountNumberData = async (accountNumberData: accountNumberProps) => {
  const response = await patchData("/user/account-number", accountNumberData);
  return response.data;
};

//마이페이지 나의 회고 모아보기
export const getMyPageRetrospectItem = async (organization: string, challengeId: string) => {
  const response = await getData<communityContentProps[][]>(
    `/challenge/record/reminiscence/${organization}/${challengeId}`
  );
  return response.data;
};
