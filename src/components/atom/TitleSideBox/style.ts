import styled from "styled-components";

export const Container = styled.div<{ $type: string }>`
  border-radius: 6px;
  background: var(--Main-0, #f5f7ff);
  color: var(--Main-50, #6272ff);
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 5px 6px 3px;
  height: fit-content;
  width: fit-content;
  margin-bottom: ${(props) => props.$type !== "special" && "3px"};
  @media (max-width: 530px) {
    padding: ${(props) => props.$type === "special" && " 2px 3px 0"};
  }
`;
