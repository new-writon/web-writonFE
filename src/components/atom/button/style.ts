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
