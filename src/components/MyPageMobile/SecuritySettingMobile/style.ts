import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 60px);
  .title {
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
    padding: 12.5px 20px;
  }
  .editField {
    display: flex;
    padding: 16px 20px;
    gap: 10px;
    max-width: 100%;
    align-items: center;
  }
  .editTitle {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    min-width: 80px;
    white-space: pre-wrap;
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
