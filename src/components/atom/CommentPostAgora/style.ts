import styled from "styled-components";

export const Container = styled.div<{ $today: boolean }>`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  .profileImageCover {
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #edeef1);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }

  textarea {
    width: calc(100% - 90px);
    max-width: 543px;
    height: 60px;
    line-height: 160%;
    border-radius: 10px;
    outline: none;
    border-radius: 10px;
    border: 1px solid var(--Gray-30, #edeef1);
    background-color: ${(props) =>
      props.$today ? "var(--White, #fff)" : " var(--Gray-20, #F8F8FA)"};
    pointer-events: ${(props) => (props.$today ? "auto" : "none")};
    padding: 8px 12px;
    box-sizing: border-box;
    resize: none;
    font-size: 0.875rem;
    caret-color: var(--Gray-100);
    color: var(--Gray-100);
    overflow-y: hidden;
    &::placeholder {
      line-height: 160%;
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--Gray-60, #94989f);
    }
    &:focus {
      border: 1px solid var(--Gray-30, #edeef1);
      &::placeholder {
        opacity: 0;
      }
    }
  }

  button {
    height: inherit;
    border-radius: 10px;
    padding: 8px 12px;
    color: var(--Main-50, #6272ff);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    background-color: ${(props) =>
      props.$today ? "var(--Main-10, #eff1ff)" : " var(--Gray-30, #EDEEF1)"};
    color: ${(props) => (props.$today ? "var(--Main-50, #6272ff)" : " var(--Gray-60, #94989F)")};
    pointer-events: ${(props) => (props.$today ? "auto" : "none")};
  }
  button.abled:hover {
    background: var(--Main-60, #5161ed);
    color: var(--White);
  }
  button.abled {
    background: var(--Main-50, #6272ff);
    color: var(--White);
  }
`;
