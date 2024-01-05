import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 234px;
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px 25px 23px;
  position: relative;

  .title {
    display: flex;
    gap: 6px;
  }
`;
export const CountingLabelContainer = styled.div`
  display: flex;
  gap: 10px;

  .priceMessage {
    @media (max-width: 1080px) {
      display: none;
    }
    padding: 13px 16px 7px;
    border-radius: 10px;
    background: var(--Gray-20, #f5f5f5);
    color: var(--Gray-80, #616161);
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
    background-color: var(--Gray-20, #f5f5f5);
  }
  .priceCondition {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
  .priceCondition p {
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 12px;
  }
`;
