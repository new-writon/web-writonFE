import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--Gray-30, #eee);
  padding: 15px 0;
  cursor: pointer;
  &:hover {
    .date,
    .text {
      text-decoration-line: underline;
    }
  }

  .date {
    width: fit-content;
    color: #000;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
  .text {
    width: 405px;
    color: var(--Gray-60, #959595);
    text-overflow: ellipsis;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
