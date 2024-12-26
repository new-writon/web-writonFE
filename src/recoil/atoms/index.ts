import { atom } from "recoil";

import {
  BasicQuestionType,
  SpecialQuestionType,
  addSpecialQuestionArrayType,
  agoraDataType,
  commentProps,
  communityContentProps,
  communitySecondCoponentType,
  postEditWritingDataType,
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

// post edit writing 배열
export const postEditWritingDataState = atom<postEditWritingDataType[]>({
  key: "postEditWritingDataState",
  default: [],
});

// 모달 백그라운드
export const modalBackgroundState = atom<{
  contentModal: boolean;
  deleteModal: boolean;
  completeModal: boolean;
  completeEditModal: boolean;
  todayWriteModal: boolean;
  agoraWriteModal: boolean;
  notificationPermissionModal: boolean;
  likePeopleModal: boolean;
}>({
  key: "modalBackgroundState",
  default: {
    contentModal: false,
    deleteModal: false,
    completeModal: false,
    completeEditModal: false,
    todayWriteModal: false,
    agoraWriteModal: false,
    notificationPermissionModal: false,
    likePeopleModal: false,
  },
});

// 모달 전달 데이터
export const modalContentState = atom<{ questionId: number; question: string; keyword: string }>({
  key: "modalContentState",
  default: { questionId: 0, question: "", keyword: "" },
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

//댓글 받아오기
export const CommentState = atom<commentProps[]>({
  key: "CommentState",
  default: [],
});

//좋아요 수
export const LikeState = atom<string>({
  key: "LikeState",
  default: "",
});

//좋아요 클릭
export const LikeClickState = atom<boolean>({
  key: "LikeClickState",
  default: false,
});

// responsive date
export const DateResponsiveState = atom<string | undefined>({
  key: "DateResponsiveState",
  default: "",
});

//임시 오늘의 한마디
export const PreTodayWriteState = atom<string>({
  key: "PreTodayWriteState",
  default: "",
});

export const CommunitySecondDataState = atom<communitySecondCoponentType>({
  key: "CommunitySecondDataState",
  default: { challengeCompleteCount: 0, templateData: [] },
});

//커뮤니티 페이지 렌더링
export const communityState = atom({
  key: "communityState",
  default: false,
});

export const dateActiveState = atom<string[]>({
  key: "dateActiveState",
  default: [],
});

export const dateLengthState = atom<number>({
  key: "dateLengthState",
  default: -1,
});

//finish modal
export const finishModalState = atom<boolean>({
  key: "finishModalState",
  default: false,
});

export const accountNumberState = atom<boolean>({
  key: "accountNumberState",
  default: false,
});

export const notficationNumberState = atom<number>({
  key: "notficationNumberState",
  default: 0,
});

//스낵바 관리
export const snackBarState = atom<{
  agoraSnackBar: boolean;
  notificationSnackBar: boolean;
}>({
  key: "snackBarState",
  default: {
    agoraSnackBar: false,
    notificationSnackBar: false,
  },
});

export const agoraModalState = atom<boolean>({
  key: "agoraModalState",
  default: false,
});
export const agoraModalBoxState = atom<boolean>({
  key: "agoraModalBoxState",
  default: false,
});

export const agoraDataState = atom<agoraDataType>({
  key: "agoraDataState",
  default: {
    smallTalkId: 0,
    question: "",
    participateCount: 0,
    nickname: "",
    createdDate: "",
    createdTime: "",
    profile: "",
    mySmallTalkSign: "",
  },
});

export const agoraBoxDataState = atom<agoraDataType[]>({
  key: "agoraBoxDataState",
  default: [],
});

export const dateAgoraActiveState = atom<string[]>({
  key: "dateAgoraActiveState",
  default: [],
});

export const dateAgoraLengthState = atom<number>({
  key: "dateAgoraLengthState",
  default: -1,
});

export const errorState = atom<string>({
  key: "errorState",
  default: "",
});

export const notificationPermissionState = atom<string | null | undefined>({
  key: "notificationPermissionState",
  default: null,
});

export const likePeopleDataState = atom<{ nickname: string; userProfileImage: string }[]>({
  key: "likePeopleDataState",
  default: [],
});
