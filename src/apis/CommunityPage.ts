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
    `/user/cheering-phrase/${challengeId}/participant-information`
  );
  return response.data;
};

// 나의 스토리
export const getMyCommunityStory = async (challengeId: string) => {
  const response = await getData<communityStoryProps>(
    `/user/cheering-phrase/${challengeId}/my-information`
  );
  return response.data;
};

// 나의 스토리 한줄 소개 쓰기
export const postMyCommunityStoryComment = async (
  organization: string,
  challengeId: number,
  content: string
) => {
  const response = await postData(`/user/cheering-phrase`, {
    organization,
    challengeId,
    content,
  });
  return response.data;
};

// 커뮤니티 활성화 날짜 배열
export const getCommunityDate = async (challengeId: string) => {
  const response = await getData<string[]>(`/challenge/information/${challengeId}`);
  return response.data;
};

// 커뮤니티 해당 날짜 데이터
export const getCommunityContentData = async (
  organization: string,
  challengeId: string,
  date: string
) => {
  const response = await getData<communitySecondCoponentType>(
    `/template/root/${organization}/${challengeId}/date/${date}`
  );
  return response.data;
};

// 아고라

// 날짜에 따른 아고라 조회 (배열)
export const getAgoraData = async (challengeId: string, date: string) => {
  const response = await getData<agoraDataType[]>(`/small-talk/${challengeId}/${date}`);
  return response.data;
};

// 해당 아고라 댓글들
export const getAgoraChat = async (smallTalkId: number) => {
  const response = await getData<agoraCommentType[]>(`small-talk/comment/read/${smallTalkId}`);
  return response.data;
};

// 아고라 생성하기
export const postAgoraTopic = async (
  organization: string,
  challengeId: number,
  smallTalkQuestion: string
) => {
  try {
    const response = await postData(`/small-talk`, {
      organization,
      challengeId,
      smallTalkQuestion,
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
  smallTalkId: number,
  smallTalkComment: string
) => {
  const response = await postData(`/small-talk/comment/write`, {
    organization: organization,
    smallTalkId: smallTalkId,
    smallTalkComment: smallTalkComment,
  });
  return response.data;
};
