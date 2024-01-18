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
    max-width: 170px;
    z-index: 9999;
  }
`;

export const WritingSubmitBtn = styled.div`
  display: flex;
  padding: 16px 0px 17px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: var(--Gray-40, #d9d9d9);
  color: var(--Gray-70, #757575);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 15px;
  cursor: pointer;
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
`;
