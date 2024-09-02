import { addMonths, getMonth } from "date-fns";
import styled from "styled-components";

import arrow from "@/assets/communityPage/storyArrow.svg";

export const CalendarArrow = ({
  firstDay,
  lastDay,
  calendarToday,
  setCalendarToday,
}: {
  firstDay: string | Date;
  lastDay: string | Date;
  calendarToday: Date;
  setCalendarToday: (calendarToday: Date) => void;
}) => {
  return (
    <Container>
      <img
        className="previous"
        src={arrow}
        alt="<"
        onClick={
          getMonth(firstDay) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, -1))
            : () => {}
        }
      />
      <div
        className="today"
        onClick={() => setCalendarToday(new Date(lastDay))}
      >
        오늘
      </div>
      <img
        className="next"
        src={arrow}
        alt="<"
        onClick={
          getMonth(lastDay) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, 1))
            : () => {}
        }
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  .today {
    color: var(--Gray-70, #73777e);
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 19.6px */
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .today:hover {
    background: var(--Gray-10, #fcfcfc);
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .next {
    transform: rotate(180deg);
  }
`;
