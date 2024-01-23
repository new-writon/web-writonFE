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

  @media (max-width: 530px) {
    margin-top: 18px;

    .RetrospectTitle {
      max-width: 375px; //모바일
      width: 100%;
      margin: 0 auto;
    }
  }
`;

export const RetroSpectBox = styled.div`
  //background-color: var(--White);
  width: 100%;
  display: flex;
  position: relative;
  @media (max-width: 530px) {
    display: none;
  }
`;

export const NoRetrospectItemBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  .noRetrospectItemBox {
    margin: 0 auto;
  }

  .noRetrospectItemBox .title {
    color: var(--Gray-80, #616161);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
    text-align: center;
    margin: 20px 0 8px;
  }
  .noRetrospectItemBox .semiTitle {
    color: var(--Gray-60, #959595);
    font-size: 1rem;
    line-height: 130%; /* 24px */
    text-align: center;
    margin-bottom: 24px;
  }

  .noRetrospectItemBox .writingBtn {
    width: fit-content;
    display: flex;
    padding: 7px 15px 7px 16px;
    border-radius: 10px;
    background-color: var(--purple-50, #6a63f5);
    justify-content: center;
    align-items: center;
    gap: 7.5px;
    cursor: pointer;
    margin: 0 auto;
  }

  p {
    color: var(--White);
    font-weight: 500;
    text-align: center;
    margin: auto 0;
    padding-top: 3px;
  }

  .writingBtn img {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 530px) {
    .noRetrospectItemBox {
      margin: 30px auto 0;
    }

    .noRetrospectItemBox .writingBtn {
      display: none;
    }
  }
`;
export const RetroSpectBoxResponsive = styled.div`
  //background-color: var(--White);
  width: 100%;
  display: flex;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  gap: 11px;
  margin-top: 12px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 531px) {
    display: none;
  }
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
  @media (max-width: 530px) {
    display: none;
  }
`;
