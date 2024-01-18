import { useState } from "react";

import { format } from "date-fns";
import { useParams } from "react-router-dom";

import downArrow from "@/assets/mainPage/downArrow.svg";
import clalendarIcon from "@/assets/mainPage/icon-calendar.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { RenderCell } from "@/components/MainPage/Calendar/RenderCells";
import { RenderDays } from "@/components/MainPage/Calendar/RenderDays";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { TooltipMessage } from "@/components/atom/TooltipMessage";
import { Inner } from "@/style/global";
import { CalendarRecordCurrentType } from "@/types";

import { Container } from "./style";

export const WeekCalendar = ({ CalendarData }: { CalendarData: CalendarRecordCurrentType[] }) => {
  const { date } = useParams();
  const [weekFold, setWeekFold] = useState<boolean>(false);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);

  return (
    <Inner>
      <Container $weekFold={weekFold}>
        <div className="topBar">
          <div className="topBarLeft">
            <MainSemiTitle font={1.25}>
              {format(date || new Date(), "M월 d일")} 회고 작성
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
            onClick={() => setWeekFold(!weekFold)}
          >
            <div className="calendarOpenBtn">{weekFold ? "달력 접기" : "날짜 선택"}</div>
            <div className="calendarOpenBtnResponsive">
              <img
                src={clalendarIcon}
                alt="달력"
              />
            </div>
            <img
              className={`${weekFold ? "topArrow" : "downArrow"}`}
              src={weekFold ? topArrow : downArrow}
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
        {weekFold && <RenderDays />}
        <RenderCell
          pageDay={date}
          fold={weekFold}
          CalendarData={CalendarData}
        />
      </Container>
    </Inner>
  );
};
