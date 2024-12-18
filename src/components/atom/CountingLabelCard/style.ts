import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  padding: 12px 16px 10px;
  border-radius: 10px;
  border: 1px solid var(--Main-20, #ccd1ff);
  background-color: var(--Main-0, #f5f7ff);
  display: flex;
  gap: 12px;
  line-height: 1.35rem;
  .labelTitle {
    color: var(--Gray-100, #1b1d1f);
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
    background: var(--Gray-40, #d2d5db);
  }
  .line {
    display: none;
    width: 1px;
    height: 100%;
    max-height: 16px;
    background: var(--Gray-40, #d2d5db);
  }
  .labelContent {
    display: flex;
    color: var(--Main-60, #5161ed);
    font-weight: 600;
    font-size: 1.125rem;
  }

  .labelContent span {
    margin-left: 5px;
    color: var(--Gray-50, #b1b4bc);
  }
  .question {
    display: none;
  }
  @media (max-width: 530px) {
    align-items: center;
    padding: 10px 20px;
    gap: 20px;
    min-height: 44px;
    border: 1px solid var(--Gray-30, #edeef1);
    background: var(--White, #fff);

    .labelTitle {
      width: fit-content;
      color: var(--Gray-70, #73777e);
      font-weight: 500;
      gap: 3px;
      max-height: 16px;
    }
    .labelTitle::after {
      display: none;
    }
    .labelContent {
      width: fit-content;
      align-items: baseline;
      font-size: 1rem;
      max-height: 16px;
    }
    .labelContent span {
      font-size: 0.875rem;
    }
    .question {
      display: block;
      width: 13px;
      height: fit-content;
      margin-top: 1.45px;
      cursor: pointer;
    }
    .line {
      display: block;
    }
  }
`;
