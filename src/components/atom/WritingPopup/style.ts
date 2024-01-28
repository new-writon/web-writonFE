import styled from "styled-components";

export const Container = styled.div`
  width: 333px;
  display: flex;
  padding: 26px;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  z-index: 1;
  position: absolute;
  top: -60px;
  right: 78px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%; /* 24px */

  @media (max-width: 530px) {
    position: relative;
    top: 0;
    right: 0;
    z-index: 99999;
  }

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

export const ContainerResponsive = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 21px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%; /* 24px */

  .contentBox {
    display: inline-flex;
    padding: 26px;
    flex-direction: column;
    gap: 8px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(33, 33, 33, 0.2);
  }
  .popUpTitle {
    color: var(--Gray-100, #212121);
  }
  .popUpSemiTitle {
    font-weight: 600;
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    line-height: 180%;
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

  .close {
    color: var(--Gray-80, #616161);
    cursor: pointer;
  }
  .delete {
    color: #da1e28;
    cursor: pointer;
  }
  .complete {
    color: var(--purple-50, #6a63f5);
    cursor: pointer;
  }

  .contentBox:has(textarea) {
    padding: 20px;
    gap: 0;
  }
  textarea {
    min-width: 200px;
    width: 100%;
    height: 34px;
    resize: none;
    font-size: 1rem;
    padding: 4px 0;
    line-height: 160%;
    outline: none;
    border: none;
    &::placeholder {
      line-height: 160%;
      font-size: 1rem;
      color: var(--Gray-70, #757575);
    }
    &:focus {
      border: none;
      &::placeholder {
        opacity: 0;
      }
    }
    @media (max-width: 530px) {
      height: 30px;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: var(--Gray-30, #eee);
    margin: 16px 0;
  }
  .numCheck {
    font-size: 0.75rem;
    color: var(--Gray-60, #959595);
    margin: 0 auto;
  }

  .tooltipMessage {
    position: absolute;
    top: -60px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: var(--Gray-20, #f5f5f5);
    border: 1px solid var(--Gray-40, #d9d9d9);
    border-radius: 10px;
    padding: 10px 12px;
    color: var(--Gray-80, #616161);
    font-size: 0.7rem;
    font-weight: 500;
    line-height: 160%; /* 15.6px */
    display: flex;
    justify-content: center;
    @media (max-width: 530px) {
      font-size: 0.75rem;
    }
  }
  .tooltipMessage::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(-45deg);
    position: absolute;
    bottom: -9px;
    margin: auto;
    left: 0;
    right: 0;
    background-color: var(--Gray-20, #f5f5f5);
    border-bottom-left-radius: 3px;
    border-left: 1px solid var(--Gray-40, #d9d9d9);
    border-bottom: 1px solid var(--Gray-40, #d9d9d9);
  }
`;
