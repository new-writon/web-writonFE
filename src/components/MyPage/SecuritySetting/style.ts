import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--White, #fff);
  width: 805px;
  height: 700px;
  border-radius: 16px;
  margin-bottom: 300px;
  padding: 50px 50px 80px 60px;
  max-height: 730px;
  .title {
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
  }
  .editField {
    display: flex;
    padding: 15px 0;
    max-width: 243px;
    justify-content: space-between;
    align-items: center;
  }
  .editTitle {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
  .editPasswordBtn {
    padding: 9px 12px 7px;
    align-items: center;
    border-radius: 10px;
    background: var(--Main-10, #eff1ff);
    color: var(--Main-50, #6272ff);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    cursor: pointer;
  }
`;
