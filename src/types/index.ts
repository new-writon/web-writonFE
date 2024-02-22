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
  job: string;
  company: string;
  oneline: string;
}

export interface CommunityItemProps {
  user: {
    name: string;
    job: string;
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
  date: string;
  badge: string;
  length: number;
}

export interface RetrospectCurrentType {
  question_id: number;
  user_templete_id: number;
  question_content_id: number;
  content: string;
  finished_at: string;
  category: string;
  question: string;
}

export interface BasicQuestionType {
  question_id: number;
  question: string;
}

export interface SpecialQuestionType {
  question_id: number;
  question: string;
  category: string;
}

export interface addSpecialQuestionArrayType {
  question_id: number;
  question: string;
}

export interface postWritingDataType {
  question_id: number;
  content: string;
  visibility: boolean;
}

export interface communityFirstComponentType {
  challengeOverlapPeriod: number;
  challengeParticipantCount: number;
  participantData: communityStoryProps[];
}

export interface communityStoryProps {
  profile: string;
  job: string;
  job_introduce: string;
  nickname: string;
  company_public: number;
  company: string | null;
  cheering_phrase: string | null;
  cheering_phrase_date: string;
  email?: string;
}

export interface communitySecondCoponentType {
  challengeCompleteCount: number;
  templateData: communityContentProps[][];
}

export interface communityContentProps {
  question_id: number;
  user_templete_id: number;
  question_content_id: number;
  content: string;
  category: string;
  question: string;
  created_at: string;
  job: string;
  company: string | null;
  company_public: number;
  nickname: string;
  profile: string;
  affiliation_id: string | null;
  likeCount: string;
  commentCount: string;
  myLikeSign: string;
}

export interface commentProps {
  job: string;
  company: string | null;
  company_public: number;
  profile: string;
  comment_id: number | string;
  nickname: string;
  user_templete_id: number;
  content: string;
  created_at: string;
  myCommentSign: number;
  comment_group: string | number;
  reply: commentProps[];
}
export interface challengeListProps {
  organization: string;
  challenge_id: number;
  challenge: string;
  challengeFinishSign: string;
}
