import styled from "styled-components";

export const Container = styled.div<{ $type: string }>`
  border-radius: 6px;
  background: var(--Purple-0, #f8f8ff);
  color: var(--Main_Purple, #6a63f5);
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 5px 6px 3px;
  height: fit-content;
  margin-bottom: ${(props) => props.$type !== "special" && "3px"};
  @media (max-width: 530px) {
    padding: ${(props) => props.$type === "special" && " 2px 3px 0"};
  }
`;
