import { atom } from "recoil";

import {
  BasicQuestionType,
  SpecialQuestionType,
  addSpecialQuestionArrayType,
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
