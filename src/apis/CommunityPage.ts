import {
  agoraCommentType,
  agoraDataType,
  communityFirstComponentType,
  communitySecondCoponentType,
  communityStoryProps,
} from "@/types";
import { ErrorData } from "@/types/axios";

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

// 아고라

// 날짜에 따른 아고라 조회 (배열)
export const getAgoraData = async (challengeId: string, date: string) => {
  const response = await getData<agoraDataType[]>(`community/agora/${challengeId}/${date}`);
  return response.data;
};

// 해당 아고라 댓글들
export const getAgoraChat = async (agoraId: number) => {
  const response = await getData<agoraCommentType[]>(`community/agora/comment/${agoraId}`);
  return response.data;
};

// 아고라 생성하기
export const postAgoraTopic = async (
  organization: string,
  challengeId: number,
  agoraQuestion: string
) => {
  try {
    const response = await postData(`community/agora`, {
      organization,
      challengeId,
      agoraQuestion,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error as ErrorData;
  }
};

// 아고라 댓글달기
export const postAgoraComment = async (
  organization: string,
  agoraId: number,
  agoraComment: string
) => {
  const response = await postData(`community/agora/comment`, {
    organization: organization,
    agoraId: agoraId,
    agoraComment: agoraComment,
  });
  return response.data;
};
