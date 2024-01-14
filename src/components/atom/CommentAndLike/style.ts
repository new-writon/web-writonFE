import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 15px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  .number {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 120%;
    margin-top: 4px;
  }
`;
