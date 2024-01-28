import {
  communityFirstComponentType,
  communitySecondCoponentType,
  communityStoryProps,
} from "@/types";

import { getData, postData } from ".";

// 커뮤니티 스토리
export const getCommunityFirstComponent = async (challengeId: string) => {
  const response = await getData<communityFirstComponentType>(
    `community/${challengeId}/participant-information`
  );
  return response.data;
};

// 나의 스토리
export const getMyCommunityStory = async (challengeId: string) => {
  const response = await getData<communityStoryProps>(
    `community/${challengeId}/my-participant-information`
  );
  return response.data;
};

// 나의 스토리 한줄 소개 쓰기
export const postMyCommunityStoryComment = async (
  organization: string,
  challengeId: number,
  content: string
) => {
  const response = await postData(`community/cheering-phrase`, {
    organization,
    challengeId,
    content,
  });
  return response.data;
};

// 커뮤니티 활성화 날짜 배열
export const getCommunityDate = async (challengeId: string) => {
  const response = await getData<string[]>(`community/${challengeId}/date`);
  return response.data;
};

// 커뮤니티 해당 날짜 데이터
export const getCommunityContentData = async (
  organization: string,
  challengeId: string,
  date: string
) => {
  const response = await getData<communitySecondCoponentType>(
    `community/${challengeId}/template/${date}/${organization}`
  );
  return response.data;
};
