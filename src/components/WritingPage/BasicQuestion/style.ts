import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: inherit;
  border-radius: 16px;
  background: var(--Base-White, #fff);
  padding: 26px 20px 20px;
  .category {
    margin-left: 6px;
  }
  .basicBox {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
`;
