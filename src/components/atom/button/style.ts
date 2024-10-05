import styled from "styled-components";

import { ButtonProps } from "@/types/index.ts";

export const KakaoBtn = styled.button<ButtonProps>`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 5px;
  background-color: #ffe812;
  border: none;
  font-size: var(--text_b1);
  font-weight: 600;
  justify-content: center;
  .container {
    width: fit-content;
    display: flex;
    gap: 10px;
  }
  span {
    padding-top: 5px;
  }
`;
export const KakaoContainer = styled.button<ButtonProps>`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 5px;
  background-color: #ffe812;
  border: none;
  font-size: var(--text_b1);
  font-weight: 600;
`;

export const BlueBtn = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  border-radius: 5px;
  border: none;

  background-color: var(--Main-50, #6272ff);
  color: var(--White, #fff);
  font-size: var(--text_b1);
  font-weight: 600;
`;

export const FloatingWriteBtn = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  padding: 20px 26px 16px 28px;
  gap: 5px;
  border-radius: 80px;
  background: var(--Main-50, #6272ff);
  box-shadow: 0px 5px 20px 0px rgba(106, 99, 245, 0.3);
  color: var(--White, #fff);
  font-size: 16px;
  font-weight: 600;
  img {
    padding-bottom: 3px;
  }
  @media (min-width: 530px) {
    display: none;
  }
  @media (max-width: 530px) {
    display: flex;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 185px;
    z-index: 9999;
  }
`;

export const WritingSubmitBtn = styled.div<{ $disabled: boolean }>`
  display: flex;
  padding: 18px 0px 14px 0px;
  box-sizing: border-box;
  max-height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${(props) =>
    props.$disabled ? "var(--Main-50, #6272ff)" : "var(--Gray-30, #edeef1)"};
  color: ${(props) => (props.$disabled ? " var(--White, #FFF);" : "var( --Gray-60, #94989f)")};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 15px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.$disabled && "var(--Main-60, #5161ed)"};
  }
  img {
    margin-left: 4px;
    padding-bottom: 3px;
  }
`;

export const KeywordBtn = styled.div<{ $select: boolean }>`
  display: flex;
  padding: 11px 10px 9px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  border: ${(props) =>
    props.$select ? "1px solid var(--Main-50, #6272ff)" : "1px solid var(--Gray-50, #b1b4bc)"};
  line-height: 11px;
  color: ${(props) => (props.$select ? " var(--Main-50, #6272ff)" : "")};
  text-align: center;
  font-size: 0.875rem;
  @media (max-width: 530px) {
    background-color: ${(props) => props.$select && "#FFFFFF"};
  }
`;

export const AddQuestionBtn = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  padding: 5px 6px 3px 16px;
  align-items: center;
  border-radius: 50px;
  background: var(--White, #fff);
  color: var(--Main-50, #6272ff);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  cursor: pointer;
  width: fit-content;
  img {
    padding-bottom: 2px;
  }
`;

export const OnboardingBtn = styled.div<{ $ButtonOn: boolean }>`
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${(props) =>
    props.$ButtonOn ? "var(--Main-50, #6272ff)" : "var(--Gray-40, #d2d5db)"};
  color: ${(props) => (props.$ButtonOn ? "var(--White, #FFF)" : "var(--Gray-70, #73777e)")};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 130%; /* 23.4px */
  cursor: pointer;
`;

export const FinishModalBtn = styled.div<{ $type: string }>`
  width: fit-content;
  padding: ${(props) =>
    props.$type === "next" ? "18px 121px" : props.$type === "finish" ? "18px 89px" : "20px 121px"};
  background-color: var(--Main-50, #6272ff);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  span {
    color: var(--White, #fff);
    font-weight: 600;
    padding-top: 2px;
  }
  img {
    position: absolute;
    right: 0;
    left: 65px;
    margin: auto;
    top: 0;
    bottom: 2px;
  }
  @media (max-width: 530px) {
    width: 283px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px 0;
  }
`;

export const CurrrentChallengeBtn = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  color: var(--Gray-100, #1b1d1f);
  font-size: 0.875rem;
  line-height: 160%; /* 22.4px */
  gap: 10px;

  .currentPage {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 14.4px */
    min-width: fit-content;
  }
  .viewPage {
    color: var(--Main-50, #6272ff);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 14.4px */
  }

  &:has(.viewPage):hover {
    cursor: pointer;
    border-radius: 7px;
    background: var(--Gray-20, #f8f8fa);
  }
`;

export const PublicBtn = styled.div<{ $secret: boolean; $state: string }>`
  width: fit-content;
  min-width: 55px;
  height: fit-content;
  display: flex;
  gap: 7px;
  justify-content: space-between;
  padding: 5px 8px;
  border-radius: 40px;
  border: ${(props) =>
    !props.$secret ? " 1px solid var(--Main-50, #6272ff)" : " 1px solid var(--Gray-40, #d2d5db);"};

  background: transparent;
  cursor: ${(props) =>
    props.$state === "edit" || props.$state === "editWrite" ? "pointer" : "auto"};
  p {
    color: ${(props) => (!props.$secret ? "var(--Main-50, #6272ff)" : "var(--Gray-60, #94989f)")};
    font-size: 0.75rem;
    margin-top: 3px;
  }
  position: ${(props) => (props.$state === "mobileDefault" ? "relative" : "absolute")};
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: ${(props) => (props.$state === "editWrite" ? "0" : "16px")};
  &:hover {
    background: ${(props) =>
      props.$state === "edit" || props.$state === "editWrite" ? "var(--Gray-20, #f8f8fa)" : ""};
  }
`;
