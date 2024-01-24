import { atom } from "recoil";

import {
  BasicQuestionType,
  SpecialQuestionType,
  addSpecialQuestionArrayType,
  communityContentProps,
  //communityContentProps,
  postWritingDataType,
} from "@/types";

//common
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

//register
export const agreeTextState = atom({
  key: "agreeTextState",
  default: -1,
});

//글쓰기 베이직 질문 배열
export const getBasicQuestionState = atom<BasicQuestionType[]>({
  key: "getBasicQuestionState",
  default: [],
});

//글쓰기 베이직 질문 배열
export const getSpecialQuestionState = atom<SpecialQuestionType[]>({
  key: "getSpecialQuestionState",
  default: [],
});

// 스페셜 질문 추가 버튼(click)
export const addSpecialQuestionState = atom<number[]>({
  key: "addSpecialQuestionState",
  default: [],
});

// 스페셜 질문 추가 배열
export const addSpecialQuestionArrayState = atom<addSpecialQuestionArrayType[]>({
  key: "addSpecialQuestionArrayState",
  default: [],
});

// post writing 배열
export const postWritingDataState = atom<postWritingDataType[]>({
  key: "postWringDataState",
  default: [],
});

// 모달 백그라운드
export const modalBackgroundState = atom<{
  contentModal: boolean;
  deleteModal: boolean;
  completeModal: boolean;
}>({
  key: "modalBackgroundState",
  default: { contentModal: false, deleteModal: false, completeModal: false },
});

// 모달 전달 데이터
export const modalContentState = atom<{ question_id: number; question: string; category: string }>({
  key: "modalContentState",
  default: { question_id: 0, question: "", category: "" },
});

export const deleteQuestionIdState = atom<number>({
  key: "deleteQuestionIdState",
  default: 0,
});

//디테일 페이지에 전달할 것
export const DetailDataState = atom<communityContentProps[]>({
  key: "DetailDataState",
  default: [],
});

//디테일 페이지 열기
export const DetailModalState = atom<boolean>({
  key: "DetailModalState",
  default: false,
});
