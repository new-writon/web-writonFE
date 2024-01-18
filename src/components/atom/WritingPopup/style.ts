import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 26px;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  z-index: 1;
  position: absolute;
  top: -50px;
  right: 70px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%; /* 24px */
  .popUpTitle {
    color: var(--Gray-100, #212121);
  }
  .popUpmessage {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
  }
  .popUpBtn {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
  }
  .delete {
    color: #da1e28;
    cursor: pointer;
  }
  .close {
    color: var(--Gray-80, #616161);
    cursor: pointer;
  }
  .complete {
    color: var(--purple-50, #6a63f5);
    cursor: pointer;
  }
`;
