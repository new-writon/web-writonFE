import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 28px;

  .commentNum {
    margin: 28px 0 21px;
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    gap: 9px;
    display: flex;
    cursor: pointer;
  }
  .commentNum img {
    padding-bottom: 3px;
  }
  .commentList {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;
