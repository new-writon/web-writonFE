import styled from "styled-components";

export const Container = styled.div`
  height: inherit;
  border-radius: 16px;
  background: var(--Base-White, #fff);
  padding: 26px 20px 20px;
  .category {
    margin-left: 6px;
    display: flex;
    justify-content: space-between;
    position: relative;
    img {
      cursor: pointer;
    }
  }
  .questionBox {
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
      border: 1px solid var(--Gray-30, #eee);
      background-color: var(--Gray-20, #f5f5f5);
      outline: none;
      padding: 20px;
      box-sizing: border-box;
      resize: none;
      font-size: 1rem;
      caret-color: #6a63f5;
      color: var(--Gray-100, #212121);
      line-height: 24px;
      &::placeholder {
        line-height: 24px;
        font-size: 1rem;
        color: var(--Gray-60, #eee);
      }
      &:focus {
        &::placeholder {
          opacity: 0;
        }
      }
    }
  }
`;
