import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px 26px 28px;

  .title {
    display: flex;
    gap: 6px;
  }

  @media (max-width: 530px) {
    padding: 28px 0;
    background-color: transparent;
    .title {
      align-items: end;
    }
  }
`;

export const IntroducePopup = styled.div<{ $xValue: number }>`
  width: 279px;
  height: 128px;
  padding: 16px;
  border-radius: 10px;
  background-color: var(--White);
  position: absolute;
  bottom: -140px;
  left: ${(props) => `${props.$xValue}px`};
  z-index: 99999;
  border: 1px solid var(--Gray-40);
  filter: drop-shadow(0px 4px 20px rgba(33, 33, 33, 0.2));
  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    position: absolute;
    top: -9px;
    margin: auto;
    left: 0;
    right: 0;
    background: var(--White, #fff);
    border-top-left-radius: 3px;
    z-index: -1;
    border-left: 1px solid var(--Gray-40);
    border-top: 1px solid var(--Gray-40);
  }
  .name {
    display: flex;
    justify-content: space-between;
    line-height: 26px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--Gray-100);
  }
  .userInfo .name img {
    cursor: pointer;
  }
  .userAddInfo {
    display: flex;
    gap: 6px;
  }
  .userAddInfo .job,
  .userAddInfo .company {
    display: flex;
    color: var(--purple-50, #6a63f5) !important;
    font-size: 0.75rem;
    font-weight: 500;
    gap: 6px;
  }
  .userAddInfo .job::after {
    content: "";
    display: block;
    width: 1px;
    height: 10px;
    background-color: #d9d9d9;
    margin-bottom: 2px;
  }
  .oneline {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--Gray-30);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 120%;
    overflow-wrap: break-word;
  }
`;

export const StoryItemBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 20px;
  padding: 0 18px;
  @media (max-width: 530px) {
    display: none;
  }
`;

export const ArrowButton = styled.div`
  position: absolute;
  height: fit-content;
  top: 0;
  bottom: 0;
  margin: auto 0;
  cursor: pointer;
  &:has(.previous) {
    left: 0;
  }
  &:has(.next) {
    right: 0;
    transform: rotate(180deg);
  }
`;

export const StoryItemBoxResponsive = styled.div`
  width: 100%;
  padding: 0 11px;
  display: flex;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  gap: 22px;
  margin-top: 28px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 531px) {
    display: none;
  }
`;
