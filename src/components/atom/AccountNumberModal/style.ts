import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountNumberBox = styled.div`
  padding: 50px 60px;
  min-width: 490px;
  border-radius: 16px;
  background: var(--White, #fff);
  @media (max-width: 530px) {
    width: 100%;
    height: 100vh;
  }
  input {
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--Gray-10, #fcfcfc);
  }
  .semititle {
    color: var(--Gray-70, #73777e);
    font-size: 0.875rem;
    line-height: 160%; /* 22.4px */
    margin-top: 10px;
  }
  .title {
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    margin-bottom: 6px;
  }
  .field {
    margin-top: 30px;
  }
`;

export const EditButton = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 16px;
  justify-content: center;
  div {
    padding: 16px 31px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
    cursor: pointer;
  }
  .editCloseBtn {
    background: var(--Main-10, #eff1ff);
    color: var(--Main-50, #6272ff);
  }
  .editCompleteBtn {
    background: var(--Main-50, #6272ff);
    color: var(--White, #fff);
  }
  @media (max-width: 530px) {
    width: 100%;
    margin-top: 30px;
    div {
      width: 50%;
      padding: 16px 0;
      text-align: center;
    }
  }
`;
