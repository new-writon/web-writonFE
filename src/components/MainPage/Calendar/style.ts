import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  margin-top: 23px;
  padding: 26px 29px;
  &:hover {
    will-change: filter;
    filter: drop-shadow(0px 14px 20px rgba(33, 33, 33, 0.05));
  }
  .topBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
  }
  .topBar .topBarLeft {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }
  .topBar .topBarLeft .question {
    display: none;
  }
  .tooltipBox {
    position: absolute;
    z-index: 99;
    top: -11px;
    left: 282px;
  }

  .topBar .calendar-operation {
    display: flex;
    gap: 16px;
  }

  .topBar .topBarRight {
    display: flex;
    color: var(--Gray-70, #73777e);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 14px 16px 12px;
    border-radius: 10px;
    border: 1px solid var(--Gray-40, #d2d5db);
    cursor: pointer;
    img {
      margin-left: 9px;
    }
    img.topArrow {
      margin-bottom: 2px;
    }
  }
  .topBar .topBarRight .calendarOpenBtnResponsive {
    display: none;
  }
  @media (min-width: 530px) {
    &:hover {
      will-change: filter;
      filter: drop-shadow(0px 14px 20px rgba(33, 33, 33, 0.05));
    }
  }
  @media (max-width: 890px) {
    .tooltipBox {
      top: -45px;
    }
  }
  @media (max-width: 700px) {
    .tooltipBox {
      top: -175px;
      left: 40px;
    }
  }
  @media (max-width: 530px) {
    & {
      will-change: filter;
      filter: drop-shadow(0px 14px 20px rgba(33, 33, 33, 0.05));
    }
    padding: 15px 15px 10px;
    margin-top: 11px;

    .topBar .topBarLeft {
      gap: 5px;
    }
    .topBar .topBarLeft div {
      font-size: 16px;
    }
    .tooltipBox {
      top: -200px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: min-content;
    }

    // 달력 버튼
    .topBar .topBarRight {
      border: none;
      padding: 0;
      padding-right: 10px;
    }
    .topBar .topBarRight .calendarOpenBtn {
      display: none;
    }
    .topBar .topBarRight .calendarOpenBtnResponsive {
      display: block;
    }
  }

  @media (max-width: 355px) {
    .tooltipBox {
      top: -135px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: min-content;
    }
  }
`;
