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
    .topBar .calendar-operation {
      display: flex;
      gap: 8px;
    }
  }
  @media (max-width: 575px) {
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

    .topBar .calendar-operation {
      display: flex;
      gap: 8px;
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
