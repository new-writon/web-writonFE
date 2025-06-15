import styled from "styled-components";

export const Container = styled.div`
  div:nth-child(1) {
    font-weight: 600 !important;
  }
  .title {
    padding-left: 6px;
    display: flex;
    justify-content: space-between;
    margin: 14px 0 12px;
  }
  .textQuestion {
    white-space: pre-wrap;
    width: calc(100% - 100px);
  }

  textarea {
    width: 100%;
    height: 189px;
    border-radius: 10px;
    border: 1px solid var(--Gray-30, #edeef1);
    background-color: var(--Gray-20, #f8f8fa);
    outline: none;
    padding: 20px;
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    caret-color: var(--Main-50, #6272ff);
    color: var(--Gray-100, #1b1d1f);
    line-height: 24px;
    &::placeholder {
      line-height: 24px;
      font-size: 1rem;
      color: var(--Gray-60, #94989f);
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;

export const PreviewContent = styled.div`
  width: 100%;
  min-height: 189px;
  padding: 20px;
  border: 1px solid var(--Gray-30, #edeef1);
  border-radius: 10px;
  background-color: var(--Gray-20, #f8f8fa);
  font-size: 1rem;
  line-height: 24px;
  overflow-y: auto;
  color: var(--Gray-100, #1b1d1f);
`;
