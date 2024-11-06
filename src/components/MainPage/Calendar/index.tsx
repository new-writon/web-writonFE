import { useEffect, useState } from "react";

import {
  differenceInCalendarWeeks,
  format,
  getDay,
  getMonth,
  isSameMonth,
  startOfMonth,
} from "date-fns";

import { CalendarArrow } from "@/components/atom/CalendarArrow";
import { CalendarToggle } from "@/components/atom/CalendarToggle";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { MonthChip } from "@/components/atom/MonthChip";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { TooltipMessage } from "@/components/atom/TooltipMessage";
import { Inner } from "@/style/global";
import { CalendarRecordCurrentType } from "@/types";

import { RenderCell } from "./RenderCells";
import { RenderDays } from "./RenderDays";
import { Container } from "./style";
export const Calendar = ({ CalendarData }: { CalendarData: CalendarRecordCurrentType[] }) => {
  const today = new Date();

  const [calendarToday, setCalendarToday] = useState<Date>(
    getMonth(CalendarData[CalendarData.length - 1].date) !== getMonth(new Date())
      ? new Date(CalendarData[CalendarData.length - 1].date)
      : new Date() // 월이 바뀌면 챌린지 마지막날 유지
  );
  useEffect(() => {
    const lastDate = CalendarData[CalendarData.length - 1].date;
    if (getMonth(lastDate) !== getMonth(new Date())) {
      setCalendarToday(new Date(lastDate));
    } else {
      setCalendarToday(new Date());
    }
  }, [CalendarData]);

  const monthStart = startOfMonth(today);

  const [fold, setFold] = useState<boolean>(false);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);

  const weekNumber =
    getDay(today) === 0
      ? differenceInCalendarWeeks(today, monthStart) + 1
      : differenceInCalendarWeeks(today, monthStart) + 2;

  const finishDay = getMonth(CalendarData[CalendarData.length - 1].date) === getMonth(new Date());
  return (
    <Inner>
      <Container>
        <div className="topBar mainCalendar">
          <div className="topBarLeft">
            <MainSemiTitle font={1.25}>
              {finishDay
                ? isSameMonth(new Date(), calendarToday) // 챌린지 하고 있을 때 달력 이동시 현재 달 표시
                  ? `${format(today, "M")}월 ${weekNumber}주차`
                  : `${getMonth(calendarToday) + 1}월`
                : `${getMonth(calendarToday) + 1}월`}
            </MainSemiTitle>
            <MonthChip finishDay={finishDay} />
            <TooltipButton
              tooltipOn={tooltipOn}
              onClick={() => setTooltopOn(!tooltipOn)}
            >
              챌린지 방법
            </TooltipButton>
          </div>
          <div className="calendar-operation">
            {fold && (
              <CalendarArrow
                firstDay={CalendarData[0].date}
                lastDay={CalendarData[CalendarData.length - 1].date}
                calendarToday={calendarToday}
                setCalendarToday={setCalendarToday}
              />
            )}
            <CalendarToggle
              toggle={fold}
              onClick={() => setFold(!fold)}
            />
          </div>
        </div>
        {tooltipOn && (
          <div className="tooltipBox">
            <TooltipMessage
              onClick={() => setTooltopOn(false)}
              direction={"left"}
              page="main"
            ></TooltipMessage>
          </div>
        )}
        <RenderDays />
        <RenderCell
          pageDay=""
          fold={fold}
          today={calendarToday}
          CalendarData={CalendarData}
        />
      </Container>
    </Inner>
  );
};
