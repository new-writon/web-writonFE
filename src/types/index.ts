/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

export interface InputProps {
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  errorLine?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  // 다른 버튼 관련 프로퍼티 추가
}
export interface SubmitButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}
export interface writingPagePopUpProps {
  onClick: () => void;
  setpopUpOn: (popUpOn: boolean) => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface MainSemiTitleProps {
  children: React.ReactNode;
  font: number;
}
export interface TitleSideBoxProps {
  children: React.ReactNode;
  type: string;
}

export interface TooltipButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  tooltipOn: boolean;
  // 다른 버튼 관련 프로퍼티 추가
}

export interface RetrospectItemProps {
  date: string;
  special: boolean;
  preview: {
    question: string;
    content: string;
  }[];
}

export interface StoryItemProps {
  name: string;
  message: string;
  profile: string;
  position: string;
  company: string;
  oneline: string;
}

export interface CommunityItemProps {
  user: {
    name: string;
    position: string;
    company: string;
    profile?: string;
    date?: string;
  };
  comment: number;
  likeCount: number;
  preview: {
    question: string;
    content: string;
  }[];
}

export interface ChallengeCurrentType {
  nickname: string;
  overlapPeriod: number;
  challengeOverlapCount: number;
  challengeSuccessCount: number;
  overlapDeposit: number;
  challengeDeposit: number;
  userProfile: string;
  organization: string;
  challenge: string;
  refundCondition: string;
}

export interface CalendarRecordCurrentType {
  date: string | Date;
  badge: string;
  length: number;
}

export interface RetrospectCurrentType {
  questionId: number;
  user_templete_id: number;
  question_content_id: number;
  content: string;
  finished_at: string;
  category: string;
  question: string;
}

export interface BasicQuestionType {
  questionId: number;
  question: string;
}

export interface SpecialQuestionType {
  questionId: number;
  question: string;
  keyword: string;
}

export interface addSpecialQuestionArrayType {
  questionId: number;
  question: string;
}

export interface postWritingDataType {
  questionId: number;
  content: string;
  visibility: boolean;
}
export interface postEditWritingDataType extends postWritingDataType {
  question: string;
  category: string;
  userTemplateId: number;
}

export interface communityFirstComponentType {
  challengeOverlapPeriod: number;
  challengeParticipantCount: number;
  participantData: communityStoryProps[];
}

export interface communityStoryProps {
  profile: string;
  position: string;
  positionIntroduce: string;
  nickname: string;
  companyPublic: number;
  company: string | null;
  cheeringPhrase: string | null;
  cheeringPhraseDate: string;
  email?: string;
}

export interface communitySecondCoponentType {
  challengeCompleteCount: number;
  templateData: communityContentProps[][];
}

export interface mainThirdCoponentType {
  templateData: communityContentProps[][];
}

export interface communityContentProps {
  questionId: number;
  userTemplateId: number;
  questionContentId: number;
  content: string;
  category: string;
  question: string;
  createdAt: string;
  position: string;
  company: string | null;
  companyPublic: number;
  nickname: string;
  profile: string;
  affiliationId: string | null;
  likeCount: string;
  commentCount: string;
  myLikeSign: string;
  visibility: number;
}

export interface commentProps {
  position: string;
  company: string | null;
  companyPublic: number;
  profile: string;
  commentId: number | string;
  nickname: string;
  userTemplateId: number;
  content: string;
  createdAt: string;
  myCommentSign: number;
  commentGroup: string | number;
  reply: commentProps[];
}

export interface finishModalType {
  nickname: string;
  organization: string;
  challenge: string;
  challengeOverlapCount: number;
  challengeSuccessCount: number;
  overlapDeposit: number;
  challengeDeposit: number;
  reviewUrl: string | null;
}

export interface challengeListProps {
  organization: string;
  challengeId: number;
  challenge: string;
  challengeFinishSign: string;
  themeColor: string;
  logo: string;
}

export interface myPageProps {
  email: string;
  userProfile: string;
  accountNumber: string;
  bank: string;
  nickname: string;
  hiredate: string;
  company: string;
  position: string;
  positionIntroduce: string;
  companyPublic: number;
}
export interface myProfileEditProps {
  nickname: string | undefined;
  hireDate: string;
  company: string | undefined;
  position: string | undefined;
  positionIntroduce: string | undefined;
  companyPublic: boolean;
}

export interface accountNumberProps {
  accountNumber: string;
  bank: string;
}

export interface myPageCommentType {
  commentId: number;
  commentCreateAt: string;
  content: string;
  userTemplateFinishedAt: string;
  writorNickname: string;
  userTemplateId: number;
}
export interface notificationDataType {
  likeId?: number;
  commentId?: number;
  content: string;
  createdAt: string;
  sign: number;
  userTemplateId: number;
  templateName: string;
  nickname: string;
  type: string;
}

export interface finishModalButtonProps extends ButtonProps {
  type: string;
}

export interface agoraDataType {
  smallTalkId: number;
  question: string;
  participateCount: number;
  nickname: string;
  createdTime: string;
  createdDate: string;
  profile: string;
  mySmallTalkSign: string;
}

export interface agoraCommentType {
  smallTalkCommentId: number;
  content: string;
  nickname: string;
  profile: string;
  createdTime: string;
  myCommentSign: string;
}
export interface satisfactionQuestionType {
  satisfactionId: number;
  type: string;
  question: string;
  score?: number;
  hoverItem?: number;
}

export interface onBoardingDataProps {
  nickname: string;
  position: string;
  positionIntroduce: string;
  hireDate: string;
  company: string;
  companyPublic: boolean;
  organization: string;
}
