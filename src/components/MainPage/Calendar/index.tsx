import { useEffect, useState } from "react";

import { differenceInCalendarWeeks, format, getDay, getMonth, startOfMonth } from "date-fns";

import downArrow from "@/assets/mainPage/downArrow.svg";
import clalendarIcon from "@/assets/mainPage/icon-calendar.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { CalendarArrow } from "@/components/atom/CalendarArrow";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
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
      ? differenceInCalendarWeeks(today, monthStart)
      : differenceInCalendarWeeks(today, monthStart) + 1;
  const finishDay = getMonth(CalendarData[CalendarData.length - 1].date) === getMonth(new Date());
  return (
    <Inner>
      <Container>
        <div className="topBar mainCalendar">
          <div className="topBarLeft">
            <MainSemiTitle font={1.25}>
              {finishDay
                ? `${format(today, "M")}월 ${weekNumber}주차 도전중`
                : `${format(CalendarData[CalendarData.length - 1].date, "M")}월 챌린지 종료`}
            </MainSemiTitle>
            <TooltipButton
              tooltipOn={tooltipOn}
              onClick={() => setTooltopOn(!tooltipOn)}
            >
              챌린지 방법
            </TooltipButton>
          </div>
          <div className="calendar-operation">
            <CalendarArrow
              defaultToday={CalendarData[CalendarData.length - 1].date}
              calendarToday={calendarToday}
              setCalendarToday={setCalendarToday}
            />
            <div
              className="topBarRight"
              onClick={() => setFold(!fold)}
            >
              <div className="calendarOpenBtn">{fold ? "달력 접기" : "달력 펼치기"}</div>
              <div className="calendarOpenBtnResponsive">
                <img
                  src={clalendarIcon}
                  alt="달력"
                />
              </div>
              <img
                className={`${fold ? "topArrow" : "downArrow"}`}
                src={fold ? topArrow : downArrow}
                alt="V"
              />
            </div>
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
