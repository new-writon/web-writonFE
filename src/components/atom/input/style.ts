import styled from "styled-components";

import { InputProps } from "@/types/index.ts";

export const BasicInput = styled.input<InputProps>`
  box-sizing: border-box;
  width: 100%;
  /* width: 370px; */
  height: 56px;
  border-radius: 5px;
  border: 1px solid var(--Gray-40, #d2d5db);
  outline: none;
  border: ${(props) =>
    props.placeholder === "아이디를 입력해주세요." && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  border: ${(props) =>
    props.placeholder === "광장에서 사용할 닉네임을 입력해주세요." && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  border: ${(props) =>
    props.placeholder === "인증코드 6자리 입력" && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  &:focus {
    border: ${(props) =>
      props.placeholder === "비밀번호를 입력해주세요."
        ? props.type === "password" && !props.errorLine
          ? "1px solid var(--Error_50,#dc362e)"
          : "1px solid var(--Main-60, #5161ed)"
        : "1px solid var(--Main-50, #6272ff)"};
    //border: 1px solid var(--Main-60, #5161ed);
  }

  //
  color: var(--Gray-100, #1b1d1f);
  padding-left: 16px;
  font-size: var(--text_b2);
  /* padding-right: 80px; */
  font-weight: 500;

  &::placeholder {
    color: var(--Gray-60, #94989f);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: -0.24px;
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

export const MyPageInput = styled.input<InputProps>`
  box-sizing: border-box;
  width: 100%;
  /* width: 370px; */
  height: 40px;
  border-radius: 5px;
  border: 1px solid var(--Gray-40, #d2d5db);
  outline: none;
  border: ${(props) =>
    props.placeholder === "아이디를 입력해주세요." && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  border: ${(props) =>
    props.placeholder === "광장에서 사용할 닉네임을 입력해주세요." && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  border: ${(props) =>
    props.placeholder === "인증코드 6자리 입력" && props.errorLine
      ? "1px solid var(--Error_50,#dc362e)"
      : ""};
  &:focus {
    border: ${(props) =>
      props.placeholder === "비밀번호를 입력해주세요."
        ? props.type === "password" && !props.errorLine
          ? "1px solid var(--Error_50,#dc362e)"
          : "1px solid var(--Main-60, #5161ed)"
        : "1px solid var(--Main-50, #6272ff)"};
    //border: 1px solid var(--Main-60, #5161ed);
  }

  //
  color: var(--Gray-100, #1b1d1f);
  padding-left: 15px;
  font-size: 0.875rem;
  /* padding-right: 80px; */
  font-weight: 500;

  &::placeholder {
    color: var(--Gray7_600, #757575);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: -0.24px;
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;
