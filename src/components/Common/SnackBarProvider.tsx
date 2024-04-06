import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";

import { snackBarState } from "@/recoil/atoms";

export const SnackBarProvider = () => {
  const snackBar = useRecoilValue(snackBarState);

  return <>{snackBar.agoraSnackBar && <SnackBar>스몰톡 주제가 등록되었어요.</SnackBar>}</>;
};

const slideIn = keyframes`
  from {
    transform: translate(-50%, 100%); /* NEW */
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0); /* NEW */
    opacity: 1;

  }
`;

const SnackBar = styled.div`
  z-index: 9999999;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  background: var(--Gray-90, #2c2f32);
  box-shadow: 0px 4px 20px 0px rgba(33, 33, 33, 0.2);
  width: 343px;
  padding: 14px 12px 14px 16px;
  color: #f5eff7;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  animation: ${slideIn} 0.7s ease-in-out forwards;
`;
