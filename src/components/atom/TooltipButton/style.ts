import styled from "styled-components";

export const Container = styled.div<{ $tooltipOn: boolean }>`
  display: flex;
  gap: 6px;
  padding: 5px 4px;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) => props.$tooltipOn && "var(--Gray-20)"};
  &:hover {
    background-color: var(--Gray-20);
  }
  p {
    padding-top: 2px;
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 12px;
  }
  @media (max-width: 530px) {
    padding: 0 0 3px 0;
    p {
      display: none;
    }
  }
`;
