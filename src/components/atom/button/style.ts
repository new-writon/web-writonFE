import styled from "styled-components";

import { ButtonProps } from "@/types/index.ts";

export const KakaoBtn = styled.button<ButtonProps>`
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

  background-color: var(--Main_Blue, #135ff3);
  color: #fff;
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
  background: var(--purple-50, #6a63f5);
  box-shadow: 0px 5px 20px 0px rgba(106, 99, 245, 0.3);
  color: #fff;
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
  padding: 16px 0px 17px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${(props) =>
    props.$disabled ? "var(--purple-50, #6A63F5)" : "var(--Gray-40, #d9d9d9)"};
  color: ${(props) => (props.$disabled ? " var(--White, #FFF);" : "var(--Gray-70, #757575)")};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 15px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.$disabled && "var(--purple-60, #524DD4)"};
  }
  img {
    margin-left: 4px;
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
    props.$select ? "1px solid var(--purple-50, #6a63f5)" : "1px solid var(--Gray-50, #BDBDBD)"};
  line-height: 11px;
  color: ${(props) => (props.$select ? " var(--purple-50, #6a63f5)" : "")};
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
  background: #fff;
  color: var(--purple-50, #6a63f5);
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
    props.$ButtonOn ? "var(--purple-50, #6A63F5)" : "var(--Gray-40, #d9d9d9)"};
  color: ${(props) => (props.$ButtonOn ? "var(--White, #FFF)" : "var(--Gray-70, #757575)")};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 130%; /* 23.4px */
  cursor: pointer;
`;

export const FinishModalBtn = styled.div`
  width: fit-content;
  padding: 18px 121px;
  background-color: var(--purple-50);
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
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
  color: var(--Gray-100, #212121);
  font-size: 0.875rem;
  line-height: 160%; /* 22.4px */

  .currentPage {
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 14.4px */
  }
  .viewPage {
    color: var(--purple-50, #6a63f5);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 14.4px */
  }

  &:has(.viewPage):hover {
    cursor: pointer;
    border-radius: 7px;
    background: var(--Gray-20, #f5f5f5);
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
    !props.$secret
      ? " 1px solid var(--purple-50, #6A63F5)"
      : " 1px solid var(--Gray-40, #d9d9d9);"};

  background: transparent;
  cursor: ${(props) => (props.$state === "edit" ? "pointer" : "auto")};
  p {
    color: ${(props) => (!props.$secret ? "var(--purple-50, #6A63F5)" : "var(--Gray-60, #959595)")};
    font-size: 0.75rem;
    margin-top: 3px;
  }
  position: ${(props) => (props.$state === "mobileDefault" ? "relative" : "absolute")};
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 16px;
  &:hover {
    background: ${(props) => props.$state === "edit" && "var(--Gray-20, #f5f5f5)"};
  }
`;
