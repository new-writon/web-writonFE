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
  top: -45px;
  left: -354px;
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
`;
