import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  margin-top: 23px;
  padding: 26px 29px;
  &:hover {
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
  .topBar .topBarLeft .tooltipBox {
    position: absolute;
    right: -540px;
    z-index: 99;
  }

  .topBar .topBarRight {
    color: var(--Gray-70, #757575);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 14px 16px 12px;
    border-radius: 10px;
    border: 1px solid var(--Gray-40, #d9d9d9);
    cursor: pointer;
    img {
      margin-left: 9px;
    }
    img.topArrow {
      margin-bottom: 2px;
    }
  }
`;
