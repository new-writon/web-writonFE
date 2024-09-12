import styled from "styled-components";

export const Container = styled.div<{ $isHover: boolean; $isClick: boolean }>`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: 1px solid var(--Gray-30, #edeef1);
  background: ${(props) =>
    props.$isClick
      ? " var(--Gray-20, #f8f8fa)"
      : props.$isHover
        ? " var(--Gray-20, #f8f8fa)"
        : "var(--Gray-10, #fcfcfc)"};
  .topBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .topBox .text {
    color: var(--Gray-60, #94989f);
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 24px;
  }
  @media (max-width: 530px) {
    width: 290px;
    min-width: 290px;
    background: ${(props) => (props.$isClick ? " var(--Gray-10, #fcfcfc)" : "var(--White, #fff)")};
    img {
      display: none;
    }
  }
`;

export const BottomBox = styled.div<{ $fold: boolean; $isClick: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  .question {
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    line-height: 160%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: ${(props) => (props.$fold ? "block" : "-webkit-box")}; // 얘네를 추가히준다
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .etcBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .etcBox div:nth-child(1) {
    background: var(--Main-10, #eff1ff);
    padding: 6px 6px 4px;
  }
  .etcBox .addBtn {
    display: ${(props) => (props.$isClick ? "flex" : "none")};
    align-items: center;
    span {
      color: ${(props) => (props.$isClick ? "var(--Gray-60, #94989f)" : "var(--Main-50, #6272ff)")};
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 24px; /* 16.8px */
      /* padding-top: 4px; */
    }
  }

  &:hover {
    .etcBox .addBtn {
      display: flex;
    }
  }
  @media (max-width: 530px) {
    .etcBox .addBtn {
      display: none;
    }
    &:hover {
      .etcBox .addBtn {
        display: none;
      }
    }
  }
`;
