import React, { useState } from "react";

import leftArrow from "@/assets/finishModal/Icon-arrow.svg";
import pencil_white from "@/assets/header/pencil_white.svg";
import kakao from "@/assets/logo/kakao.svg";
import publicIMG from "@/assets/mypage/public.svg";
import secretIMG from "@/assets/mypage/secret.svg";
import check_white from "@/assets/writingPage/icon-check-white.svg";
import check from "@/assets/writingPage/icon-check.svg";
import question_minus from "@/assets/writingPage/question-minus.svg";
import question_plus from "@/assets/writingPage/question-plus.svg";
import { ButtonProps, SubmitButtonProps, finishModalButtonProps } from "@/types";

import {
  AddQuestionBtn,
  BlueBtn,
  FinishModalBtn,
  CurrrentChallengeBtn,
  FloatingWriteBtn,
  KakaoBtn,
  KeywordBtn,
  OnboardingBtn,
  PublicBtn,
  WritingSubmitBtn,
} from "./style";
export const KakaoButton = ({ children, onClick }: ButtonProps) => {
  return (
    <KakaoBtn onClick={onClick}>
      <div className="container">
        <img
          src={kakao}
          alt="Kakao"
        />
        <span>{children}</span>
      </div>
    </KakaoBtn>
  );
};

export const BlueButton = ({ children, onClick }: ButtonProps) => {
  return <BlueBtn onClick={onClick}>{children}</BlueBtn>;
};

export const FloatingWriteButton = ({ children, onClick }: ButtonProps) => {
  return (
    <FloatingWriteBtn onClick={onClick}>
      {children}
      <img
        src={pencil_white}
        alt="pen"
      />
    </FloatingWriteBtn>
  );
};

export const WritingSubmitButton = ({ children, onClick, disabled }: SubmitButtonProps) => {
  return (
    <WritingSubmitBtn
      onClick={onClick}
      $disabled={disabled}
    >
      {children}
      <img
        src={disabled ? check_white : check}
        alt="V"
      />
    </WritingSubmitBtn>
  );
};

interface KeywordButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  select: boolean;
}
export const KeywordButton = ({ children, onClick, select }: KeywordButtonProps) => {
  return (
    <KeywordBtn
      onClick={onClick}
      $select={select}
    >
      {children}
    </KeywordBtn>
  );
};

interface AddQuestionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ButtonOn: boolean;
}
export const AddQuestionButton = ({ children, onClick, ButtonOn }: AddQuestionButtonProps) => {
  return (
    <AddQuestionBtn onClick={onClick}>
      {children}
      <img
        src={ButtonOn ? question_minus : question_plus}
        alt="+"
      />
    </AddQuestionBtn>
  );
};

interface OnboardingButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ButtonOn: boolean;
}

export const OnboardingButton = ({ children, onClick, ButtonOn }: OnboardingButtonProps) => {
  return (
    <OnboardingBtn
      onClick={onClick}
      $ButtonOn={ButtonOn}
    >
      {children}
    </OnboardingBtn>
  );
};

interface ChallengeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  challengeId: string;
}

export const CurrrentChallengeButton = ({
  children,
  onClick,
  challengeId,
}: ChallengeButtonProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <CurrrentChallengeBtn
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className="title">{children}</div>
      {challengeId === localStorage.getItem("challengeId") ? (
        <div className="currentPage">현재 페이지</div>
      ) : isHover ? (
        <div className="viewPage">보러가기</div>
      ) : (
        ""
      )}
    </CurrrentChallengeBtn>
  );
};

export const FinishModalButton = ({ children, onClick, type }: finishModalButtonProps) => {
  return (
    <FinishModalBtn
      onClick={onClick}
      $type={type}
    >
      <span>{children}</span>
      {type === "next" && (
        <img
          src={leftArrow}
          alt="->"
        />
      )}
    </FinishModalBtn>
  );
};

interface PublicButtonProps {
  secret: boolean;
  onClick: () => void;
  state: string;
}
export const PublicButton = ({ onClick, secret, state }: PublicButtonProps) => {
  return (
    <PublicBtn
      onClick={onClick}
      $secret={secret}
      $state={state}
    >
      <p>{!secret ? "비공개" : "공개"}</p>
      <img
        src={!secret ? secretIMG : publicIMG}
        alt="0"
      />
    </PublicBtn>
  );
};
