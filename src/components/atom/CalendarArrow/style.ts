import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  .today {
    color: var(--Gray-70, #73777e);
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 19.6px */
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .today:hover {
    background: var(--Gray-10, #fcfcfc);
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .next {
    transform: rotate(180deg);
  }
`;