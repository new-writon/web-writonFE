import React from "react";

import pencil_white from "@/assets/header/pencil_white.svg";
import kakao from "@/assets/logo/kakao.svg";
import check_white from "@/assets/writingPage/icon-check-white.svg";
import check from "@/assets/writingPage/icon-check.svg";
import { ButtonProps, SubmitButtonProps } from "@/types";

import { BlueBtn, FloatingWriteBtn, KakaoBtn, KeywordBtn, WritingSubmitBtn } from "./style";

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
