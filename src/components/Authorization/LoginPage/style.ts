import styled from "styled-components";

export const Container = styled.div`
  width: 370px;
  padding: 0 20px;
  box-sizing: content-box;
`;

export const InputBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 2rem;
`;

export const OrLine = styled.div`
  color: var(--Gray-50, #b1b4bc);
  text-align: center;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;
  &::before,
  &::after {
    content: "";
    display: block;
    width: 45%;
    height: 1px;
    background-color: var(--Gray-40, #d2d5db);
  }
`;
export const EtcBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  gap: 2.5rem;
  .findProp {
    display: flex;
    gap: 10px;
    color: var(--Gray7_600);
    text-align: center;
  }
  .notActive {
    cursor: pointer;
  }
  .notUser {
    display: flex;
    color: var(--Gray-50, #b1b4bc);
    text-align: center;

    gap: 14px;

    .sign-up {
      color: var(--Main-60, #5161ed);
      cursor: pointer;
      text-decoration-line: underline;
    }
  }
`;
