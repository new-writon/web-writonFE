import { addMonths, getMonth } from "date-fns";

import arrow from "@/assets/communityPage/storyArrow.svg";

import { Container } from "./style";

export const CalendarArrow = ({
  defaultToday,
  calendarToday,
  setCalendarToday,
}: {
  defaultToday: string | Date;
  calendarToday: Date;
  setCalendarToday: (calendarToday: Date) => void;
}) => {
  return (
    <Container>
      <img
        className="previous"
        src={arrow}
        alt="<"
        onClick={() => setCalendarToday(addMonths(calendarToday, -1))}
      />
      <div
        className="today"
        onClick={() => setCalendarToday(new Date(defaultToday))}
      >
        오늘
      </div>
      <img
        className="next"
        src={arrow}
        alt="<"
        onClick={
          getMonth(defaultToday) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, 1))
            : () => {}
        }
      />
    </Container>
  );
};
