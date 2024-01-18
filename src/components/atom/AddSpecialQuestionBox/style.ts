import styled from "styled-components";

export const Container = styled.div<{ $isHover: boolean; $isClick: boolean }>`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: 1px solid var(--Gray-30, #eee);
  background: ${(props) =>
    props.$isClick
      ? " var(--Gray-20, #F5F5F5)"
      : props.$isHover
        ? " var(--Gray-20, #F5F5F5)"
        : "var(--Gray-10, #fafafa)"};
  .topBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .topBox .text {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const BottomBox = styled.div<{ $fold: boolean; $isClick: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  .question {
    color: var(--Gray-100, #212121);
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
    background: var(--Purple-10, #f0efff);
    padding: 6px 6px 4px;
  }
  .etcBox .addBtn {
    display: ${(props) => (props.$isClick ? "flex" : "none")};
    align-items: center;
    p {
      color: ${(props) =>
        props.$isClick ? "var(--Gray-60, #959595)" : "var(--purple-50, #6a63f5)"};
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 120%; /* 16.8px */
      padding-top: 4px;
    }
  }

  &:hover {
    .etcBox .addBtn {
      display: flex;
    }
  }
`;
