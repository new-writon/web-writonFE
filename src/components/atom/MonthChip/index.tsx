import styled from "styled-components";

export const MonthChip = ({ finishDay }: { finishDay: boolean }) => {
  // 다른 월로 넘어가면 이게 false가 되어 도전완료로 뜬다.
  return <Container $finishDay={finishDay}>{finishDay ? "도전중" : "도전 완료"}</Container>;
};

const Container = styled.div<{ $finishDay: boolean }>`
  border-radius: 4px;
  display: flex;
  padding: 4px 8px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 18.2px */

  ${({ $finishDay }) =>
    $finishDay
      ? `
        background: var(--Main-10, #eff1ff);
        color: var(--Main-50, #6272ff);
    `
      : ` background: var(--Gray-20, #F8F8FA);
        color: var(--Gray-60, #94989F);
`}
`;
