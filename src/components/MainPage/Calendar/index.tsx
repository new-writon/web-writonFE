import { useState } from "react";

import { differenceInCalendarWeeks, format, getWeek, startOfMonth } from "date-fns";

import downArrow from "@/assets/mainPage/downArrow.svg";
import clalendarIcon from "@/assets/mainPage/icon-calendar.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
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
  const monthStart = startOfMonth(today);

  const [fold, setFold] = useState<boolean>(false);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);
  const weekNumber =
    getWeek(today) === 6
      ? differenceInCalendarWeeks(today, monthStart)
      : differenceInCalendarWeeks(today, monthStart) + 1;
  return (
    <Inner>
      <Container>
        <div className="topBar mainCalendar">
          <div className="topBarLeft">
            <MainSemiTitle font={1.25}>
              {format(today, "M")}월 {weekNumber}주차 도전중
            </MainSemiTitle>
            <TooltipButton
              tooltipOn={tooltipOn}
              onClick={() => setTooltopOn(!tooltipOn)}
            >
              챌린지 방법
            </TooltipButton>
          </div>
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
        {tooltipOn && (
          <div className="tooltipBox">
            <TooltipMessage
              onClick={() => setTooltopOn(false)}
              direction={"left"}
            ></TooltipMessage>
          </div>
        )}
        <RenderDays />
        <RenderCell
          pageDay=""
          fold={fold}
          CalendarData={CalendarData}
        />
      </Container>
    </Inner>
  );
};
