import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px 0 0;
  box-sizing: border-box;
  .title {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0 26px;
  }
  .title-and-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 12px;
    padding: 0 26px;
  }
  .change-date {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }
  .change-date .today {
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    height: 30px;
  }
  .change-date .today:hover {
    background: var(--Gray-10, #fcfcfc);
  }
  .change-date .previous {
    cursor: pointer;
  }

  .change-date .next {
    cursor: pointer;
    transform: rotate(180deg);
  }

  @media (max-width: 530px) {
    width: 100%;
    background-color: transparent;
    padding: 29px 0 0;
    .title {
      padding: 0;
    }
    .title-and-date {
      margin: 31px 0 16px;
      padding: 0;
    }
  }
`;

export const AgoraItemView = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  padding: 0 26px 26px;
  @media (max-width: 530px) {
    padding: 0 0 28px;
  }
`;

export const NoAgoraView = styled.div`
  min-height: 134px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin: auto;
  span {
    overflow: hidden;
    color: #94989f;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
`;

export const TodayNoAgoraView = styled.div`
  min-width: fit-content;
  margin-left: 43px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    position: absolute;
    top: 70%;
    transform: translateX(-30%);
  }
  span {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
  @media (max-width: 530px) {
    margin-left: 0;
    img {
      transform: scale(0.8);
    }
    span {
      font-size: 0.7rem;
    }
  }
`;
