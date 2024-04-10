import styled from "styled-components";

export const Container = styled.div<{ $weekFold: boolean }>`
  width: 100%;
  background-color: var(--White);
  border-radius: 16px;
  padding: 26px 20px 26px 26px;
  .topBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.$weekFold && "26px"};
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
    z-index: 9999;
    top: -11px;
    left: 295px;
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

  @media (max-width: 890px) {
    .tooltipBox {
      top: -45px;
    }
  }

  @media (max-width: 530px) {
    padding: 15px;
    .topBar .topBarLeft {
      gap: 5px;
    }
    .topBar .topBarLeft div {
      font-size: 16px;
    }
    .tooltipBox {
      top: 55px;
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
