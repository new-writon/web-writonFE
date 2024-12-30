// 알람 로직
import { notificationDataType } from "@/types";

import { getData, patchData, postData } from ".";

//내가 지금까지 확인한 알림 갯수
export const getNotificationCount = async (organization: string, challengeId: string) => {
  const response = await getData<{ checkCount: number }>(
    `/user/challenge/${organization}/${challengeId}/check-count`
  );
  return response.data;
};

// 내가 본 알림 갯수 업데이트 시키기 (그 본 (알림 배열) 알림 갯수를 체크해서 보내면 된다.)
export const patchNotificationCount = async (
  organization: string,
  challengeId: string,
  checkCount: number
) => {
  const response = await patchData(`/user/challenge/${organization}/${challengeId}/check-count`, {
    checkCount: checkCount,
  });
  return response;
};

// 내가 본 알림 중 좋아요 봤다는거 표시
export const patchNotificationLike = async (likeId: number) => {
  const response = await patchData("/template/like/check", { likeId: likeId });
  return response.data;
};

// 내가 본 알림 중 댓글 봤다는거 표시
export const patchNotificationComment = async (commentId: number) => {
  const response = await patchData("/template/comment/check", { commentId: commentId });
  return response.data;
};

// 알림창에 좋아요 및 댓글들 조회 해오기
export const getNotificationData = async (organization: string, challengeId: string) => {
  const response = await getData<notificationDataType[]>(
    `/template/root/${organization}/${challengeId}/notify`
  );
  return response.data;
};

// 푸시알림 유저 상태 조회
export const getNotificationPermission = async () => {
  const response = await getData<{ content: string | null }>("/user/alarm");
  return response.data.content;
};

// 푸시알림 유저 상태 변경 granted, denied
export const patchNotificationPermission = async (content: string) => {
  // console.log(content);
  const response = await patchData("/user/alarm", {
    content: content,
  });
  return response.data;
};

// 푸시알림 디바이스토큰 보내기
export const postDeviceToken = async (deviceToken: string) => {
  const response = await postData(
    "/user/firebase-token",
    {},
    {
      headers: {
        engine: deviceToken,
      },
    }
  );
  return response;
};
