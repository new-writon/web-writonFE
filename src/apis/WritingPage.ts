import { BasicQuestionType, SpecialQuestionType, postWritingDataType } from "@/types";

import { getData, postData } from ".";

// 글쓰기 페이지 베이직 질문 조희
export const getBasicQuestion = async (challengeId: string) => {
  const response = await getData<BasicQuestionType[]>(
    `/challenge/question/${challengeId}/basic-question`
  );
  return response.data;
};

// 글쓰기 페이지 스페셜 질문 조희
export const getSpecialQuestion = async (challengeId: string) => {
  const response = await getData<SpecialQuestionType[]>(
    `/challenge/question/${challengeId}/special-question`
  );
  return response.data;
};

// 글쓰기 submit 저장
export const postwritingSubmit = async (
  organization: string,
  challengeId: string,
  date: string,
  templateContent: postWritingDataType[]
) => {
  const response = await postData("/template/root/write", {
    organization,
    challengeId,
    date,
    templateContent,
  });
  return response.data;
};
