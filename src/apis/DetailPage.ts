import { commentProps } from "@/types";

import { getData, postData } from ".";

//탬플릿 댓글
export const getComment = async (userTemplateId: number) => {
  const response = await getData<commentProps[]>(`community/${userTemplateId}/comment`);
  return response.data;
};

//좋아요
export const postLike = async (userTemplateId: number, organization: string) => {
  const response = await postData("community/like", {
    userTemplateId,
    organization,
  });
  return response.data;
};

//좋아요 취소
export const postLikeDelete = async (userTemplateId: number, organization: string) => {
  const response = await postData("community/like/delete", {
    userTemplateId,
    organization,
  });
  return response.data;
};

// 좋아요 갯수 조희
export const getLikeCheck = async (userTemplateId: number) => {
  const response = await getData(`community/like/${userTemplateId}`);
  return response.data;
};

// 댓글 작성
export const postCommentWrite = async (
  userTemplateId: number,
  organization: string,
  content: string,
  commentGroup: number
) => {
  const response = await postData<{ comment_id: number }>("community/comment", {
    userTemplateId,
    organization,
    content,
    commentGroup,
  });
  return response.data;
};
