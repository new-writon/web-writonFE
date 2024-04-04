import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: var(--Gray-80, #464c52);
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    padding-top: 3px;
  }
  .number {
    color: var(--Gray-60, #94989f);
    font-weight: 500;
  }
`;
