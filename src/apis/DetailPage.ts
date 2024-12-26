import { commentProps, communityContentProps } from "@/types";

import { getData, postData, putData } from ".";

//탬플릿 댓글
export const getComment = async (userTemplateId: number, organization: string) => {
  const response = await getData<
    commentProps[]
  >(`/template/comment/${organization}/userTemplateId/${userTemplateId}
`);
  return response.data;
};
//좋아요
export const postLike = async (userTemplateId: number, organization: string) => {
  const response = await postData("/template/like", {
    userTemplateId,
    organization,
  });
  return response.data;
};

//좋아요 취소
export const postLikeDelete = async (userTemplateId: number, organization: string) => {
  const response = await putData("/template/like", {
    userTemplateId,
    organization,
  });
  return response.data;
};

// 좋아요 갯수 조희
export const getLikeCheck = async (userTemplateId: number) => {
  const response = await getData(`/template/like/${userTemplateId}`);
  return response.data;
};

// 좋아요 누른 사람 조희
export const getLikePeople = async (userTemplateId: number) => {
  const response = await getData<
    {
      nickname: string;
      userProfileImage: string;
    }[]
  >(`/template/like/click/${userTemplateId}`);
  return response.data;
};

// 댓글 작성
export const postCommentWrite = async (
  userTemplateId: number,
  organization: string,
  content: string,
  commentGroup: number
) => {
  const response = await postData<{ commentId: number }>("/template/comment", {
    userTemplateId,
    organization,
    content,
    commentGroup,
  });
  return response.data;
};

//템플릿 하나 조회
export const getTemplete = async (
  organization: string,
  userTemplateId: number,
  visibility: boolean
) => {
  const response = await getData<communityContentProps[]>(
    `/template/root/${organization}/${userTemplateId}/visibility/${visibility}`
  );
  return response.data;
};
