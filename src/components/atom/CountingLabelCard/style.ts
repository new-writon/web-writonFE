import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  padding: 12px 16px 10px;
  border-radius: 10px;
  border: 1px solid var(--Purple-20, #cfcdff);
  background-color: var(--Purple-0, #f8f8ff);
  display: flex;
  gap: 12px;
  line-height: 1.35rem;
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
    font-size: 1.125rem;
  }
  .labelContent p {
    margin-left: 5px;
    color: var(--Gray-50, #bdbdbd);
  }
`;
