import { addMonths, getMonth } from "date-fns";

import arrow from "@/assets/communityPage/storyArrow.svg";

import { Container } from "./style";

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
