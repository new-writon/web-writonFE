import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  padding: 11px 16px 9px;
  border-radius: 10px;
  border: 1px solid var(--Gray-30, #eee);
  background: var(--Gray-10, #fafafa);
  display: flex;
  gap: 12px;
  line-height: 1rem;
  .labelTitle {
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    gap: 12px;
  }
  .labelTitle::after {
    content: "";
    display: block;
    width: 1px;
    height: 16px;
    background: #d9d9d9;
  }
  .labelContent {
    display: flex;
    color: var(--Purple-60, #524dd4);
    font-weight: 600;
  }
  .labelContent p {
    margin-left: 5px;
    color: var(--Gray-50, #bdbdbd);
  }
`;
