import styled from "styled-components";

import { InputProps } from "@/types/index.ts";

export const BasicInput = styled.input<InputProps>`
  box-sizing: border-box;
  width: 100%;
  /* width: 370px; */
  height: 56px;
  border-radius: 5px;
  border: 1px solid var(--Gray4_300, #d9d9d9);
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
          : "1px solid var(--Main_Blue, #135ff3)"
        : "1px solid var(--Main_Blue, #135ff3)"};
    //border: 1px solid var(--Main_Blue, #135ff3);
  }

  //
  color: var(--Gray10_900, #212121);
  padding-left: 20px;
  font-size: var(--text_b2);
  /* padding-right: 80px; */
  font-weight: 500;

  &::placeholder {
    color: var(--Gray7_600, #757575);
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
