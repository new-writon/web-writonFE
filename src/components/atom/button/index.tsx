import React, { useState } from "react";

import pencil_white from "@/assets/header/pencil_white.svg";
import kakao from "@/assets/logo/kakao.svg";
import check_white from "@/assets/writingPage/icon-check-white.svg";
import check from "@/assets/writingPage/icon-check.svg";
import question_minus from "@/assets/writingPage/question-minus.svg";
import question_plus from "@/assets/writingPage/question-plus.svg";
import { ButtonProps, SubmitButtonProps } from "@/types";

import {
  AddQuestionBtn,
  BlueBtn,
  FinishModalBtn,
  CurrrentChallengeBtn,
  FloatingWriteBtn,
  KakaoBtn,
  KeywordBtn,
  OnboardingBtn,
  WritingSubmitBtn,
} from "./style";

export const KakaoButton = ({ children, onClick }: ButtonProps) => {
  return (
    <KakaoBtn onClick={onClick}>
      <p>
        <img
          src={kakao}
          alt="Kakao"
        />
      </p>
      {children}
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

export const CurrrentChallengeButton = ({ children, onClick }: ButtonProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <CurrrentChallengeBtn
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className="title">{children}</div>
      <div className="currentPage">현재 페이지</div>
      {isHover ? <div className="viewPage">보러가기</div> : ""}
    </CurrrentChallengeBtn>
  );
};

export const FinishModalButton = ({ children, onClick }: ButtonProps) => {
  return <FinishModalBtn onClick={onClick}>{children}</FinishModalBtn>;
};
