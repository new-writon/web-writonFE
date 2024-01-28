import styled from "styled-components";

export const Container = styled.div<{ $type: string | undefined }>`
  display: flex;
  gap: 12px;
  width: 100%;
  position: relative;
  .profileImageCover {
    width: 34px;
    height: 34px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #eee);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }

  textarea {
    @media (max-width: 830px) {
      width: ${(props) => (props.$type === "reply" ? "65%" : "70%")};
      min-width: 153px;
    }
    width: 100%;
    max-width: 543px;
    height: 38px;
    line-height: 160%;
    border-radius: 10px;
    background: var(--Gray-20, #f5f5f5);
    outline: none;
    border: 1px solid var(--Gray-30, #eee);
    padding: 8px 10px;
    box-sizing: border-box;
    resize: none;
    font-size: 0.875rem;
    caret-color: var(--Gray-100);
    color: var(--Gray-100);
    overflow-y: hidden;
    &::placeholder {
      line-height: 160%;
      font-size: 0.875rem;
      color: var(--Gray-70, #757575);
    }
    &:focus {
      border: 1px solid var(--Gray-30, #eee);
      &::placeholder {
        opacity: 0;
      }
    }
  }

  button {
    height: inherit;
    border-radius: 10px;
    background: var(--Purple-10, #f0efff);
    padding: 8px 12px;
    color: var(--purple-50, #6a63f5);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    border: none;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
  button.abled:hover {
    background: var(--Purple-60, #524dd4);
    color: var(--White);
  }
  button.abled {
    background: var(--purple-50, #6a63f5);
    color: var(--White);
  }
`;
