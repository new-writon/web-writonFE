import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 805px;
  height: 700px;
  border-radius: 16px;
  margin-bottom: 300px;
  padding: 50px 50px 80px 60px;
  max-height: 700px;
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
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
  .editPasswordBtn {
    padding: 9px 12px 7px;
    align-items: center;
    border-radius: 10px;
    background: var(--Purple-10, #f0efff);
    color: var(--purple-50, #6a63f5);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    cursor: pointer;
  }
`;
