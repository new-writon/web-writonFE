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
  .introducePopup {
    padding: 16px;
    border-radius: 10px;
    background-color: var(--White, #fff);
    z-index: 10;
    position: absolute;
    bottom: -52px;
  }
  .introducePopup::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    position: absolute;
    top: -3px;
    margin: auto;
    left: 0;
    right: 0;
    background: var(--White, #fff);
    border-bottom-left-radius: 3px;
    z-index: -1;
  }
  @media (max-width: 530px) {
    padding: 28px 0;
    background-color: transparent;
    .title {
      align-items: end;
    }
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
