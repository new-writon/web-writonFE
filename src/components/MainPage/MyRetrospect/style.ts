import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;
  padding-bottom: 87px;
  .RetrospectTitle {
    padding-left: 26px;
    display: flex;
    gap: 6px;
  }
  .RetrospectTitle .quantity {
    color: var(--Gray-60, #959595);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 22px;
  }
`;

export const RetroSpectBox = styled.div`
  //background-color: var(--White);
  width: 100%;
  display: flex;
  position: relative;
`;

export const ArrowButton = styled.div`
  border-radius: 100%;
  border: 1px solid var(--Gray-30);
  position: absolute;
  background-color: var(--White);
  padding: 20px 18px 16px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: fit-content;
  cursor: pointer;
  img {
    width: 29px;
    height: fit-content;
  }
  &:has(.previous) {
    left: -18px;
    transform: rotate(180deg);
  }
  &:has(.next) {
    right: -28px;
  }
  &:hover {
    background-color: var(--Gray-10);
  }
`;