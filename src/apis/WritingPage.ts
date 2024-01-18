import { BasicQuestionType, SpecialQuestionType } from "@/types";

import { getData } from ".";

// 글쓰기 페이지 베이직 질문 조희
export const getBasicQuestion = async (challengeId: string) => {
  const response = await getData<BasicQuestionType[]>(
    `/challenge/write/${challengeId}/basic-question`
  );
  return response.data;
};

// 글쓰기 페이지 스페셜 질문 조희
export const getSpecialQuestion = async (challengeId: string) => {
  const response = await getData<SpecialQuestionType[]>(
    `/challenge/write/${challengeId}/special-question`
  );
  return response.data;
};
