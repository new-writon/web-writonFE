import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px 25px;
  position: relative;

  .title {
    display: flex;
    gap: 6px;
  }
  @media (min-width: 530px) {
    &:hover {
      will-change: filter;
      filter: drop-shadow(0px 14px 20px rgba(33, 33, 33, 0.05));
    }
  }
  @media (max-width: 530px) {
    background-color: transparent;
    padding: 5px 0 0;
    .title {
      gap: 0;
      justify-content: space-between;
    }
    .webCountingLabelBox {
      display: none;
    }
  }
`;
export const CountingLabelContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 710px) {
    flex-direction: column;
  }
  .priceMessage {
    @media (max-width: 1080px) {
      display: none;
    }
    padding: 13px 16px 7px;
    border-radius: 10px;
    background: var(--Gray-20, #f8f8fa);
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-weight: 500;
    position: relative;
    margin-left: 5px;
  }
  .priceMessage::before {
    content: "";
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    position: absolute;
    bottom: 0;
    top: 0;
    left: -5px;
    margin: auto 0;
    border-radius: 3px;
    overflow: hidden;
    background-color: var(--Gray-20, #f8f8fa);
  }
  .priceCondition {
    position: absolute;
    right: 0;
    bottom: 5px;
  }
  .tooltipBox {
    position: absolute;
    left: -305px;
    top: -45px;
  }

  @media (max-width: 530px) {
    flex-direction: row;
    width: 100%;
    .cardWrapper:nth-child(1) {
      /* width: 40%; */
      display: flex;
    }
    .cardWrapper:nth-child(2) {
      width: 60%;
    }
    .priceCondition {
      display: none;
    }
    .tooltipBox {
      left: 30px;
      top: -120px;
    }
  }
`;
