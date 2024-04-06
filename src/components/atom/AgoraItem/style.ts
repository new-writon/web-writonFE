import styled from "styled-components";

export const Container = styled.div<{ $type: string }>`
  min-width: 245px;
  max-width: 245px;
  min-height: 134px;
  border-radius: 12px;
  border: 1px solid var(--Gray-30, #edeef1);
  background: var(--Base-White, #fff);
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  cursor: pointer;
  @media (max-width: 530px) {
    min-width: 202px;
    max-width: 202px;
    max-height: 134px;
  }
  &:hover {
    background-color: var(--Gray-10, #fafafa);
  }
  .question {
    min-height: 44px;
    max-height: 44px;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
    color: var(--Gray-90, #2c2f32);
    text-align: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    display: -webkit-box; // 얘네를 추가히준다
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    // display flex냐 --webkit-box냐 는 두줄 한줄 ㄹ로 구분
  }
  .bottom {
    display: flex;
    justify-content: space-between;
  }
  .bottom .participant {
    display: flex;
    align-items: center;
  }
  .bottom .participant .text {
    color: var(--Gray-70, #73777e);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    padding-top: 3px;
  }
  .bottom .participant .text .participant-number {
    color: var(--Gray-70, #73777e);
    font-family: 600;
    margin-left: 2px;
    font-size: 0.75rem;
  }

  button.comment {
    border-radius: 10px;
    background: ${(props) =>
      props.$type === "1"
        ? "var(--Gray-30, #EDEEF1)"
        : props.$type === "답변 달기"
          ? "var(--Purple-10, #f0efff)"
          : "var(--Gray-30, #EDEEF1)"};
    color: ${(props) =>
      props.$type === "1"
        ? "var(--Gray-60, #94989F)"
        : props.$type === "답변 달기"
          ? "var(--purple-50, #6a63f5)"
          : "var(--Gray-60, #94989F)"};
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    padding: 9px 12px 7px;
  }
`;

export const ThrowingContainer = styled.div<{ $type: string }>`
  min-width: 245px;
  max-width: 245px;
  min-height: 134px;
  border-radius: 12px;
  border: 1px solid var(--Gray-30, #edeef1);
  background: var(--Base-White, #fff);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  @media (max-width: 530px) {
    min-width: 202px;
    max-width: 202px;
    max-height: 134px;
    gap: ${(props) => (props.$type === "full" ? "0" : "12px")};
  }
  .topic-question {
    color: var(--Gray-60, #94989f);
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
  .topic-button {
    width: fit-content;
    border-radius: 10px;
    background: ${(props) =>
      props.$type === "empty" ? "var(--Purple-10, #f0efff)" : "var(--Gray-30, #EDEEF1)"};
    color: ${(props) =>
      props.$type === "empty" ? " var(--purple-50, #6a63f5);" : "var(--Gray-60, #94989F)"};
    pointer-events: ${(props) => props.$type === "full" && "none"};
    padding: 9px 12px 7px;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
`;
