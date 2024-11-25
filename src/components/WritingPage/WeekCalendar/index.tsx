import { useState } from "react";

import { format, getMonth } from "date-fns";
import { useParams } from "react-router-dom";

import { RenderCell } from "@/components/MainPage/Calendar/RenderCells";
import { RenderDays } from "@/components/MainPage/Calendar/RenderDays";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { TooltipMessage } from "@/components/atom/TooltipMessage";
import { Inner } from "@/style/global";
import { CalendarRecordCurrentType } from "@/types";

import { Container } from "./style";
import { CalendarToggle } from "@/components/atom/CalendarToggle";

export const WeekCalendar = ({
  CalendarData,
  CalendarWithGrayData,
}: {
  CalendarData: CalendarRecordCurrentType[];
  CalendarWithGrayData: CalendarRecordCurrentType[];
}) => {
  const { date } = useParams();
  const [weekFold, setWeekFold] = useState<boolean>(false);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);

  return (
    <Inner>
      <Container $weekFold={weekFold}>
        <div className="weekCalendar topBar">
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
          <CalendarToggle
            toggle={weekFold}
            onClick={() => setWeekFold(!weekFold)}
          />
        </div>
        {tooltipOn && (
          <div className="tooltipBox">
            <TooltipMessage
              onClick={() => setTooltopOn(false)}
              direction={"left"}
              page="writing"
            ></TooltipMessage>
          </div>
        )}
        {weekFold && <RenderDays />}
        {CalendarData.length > 0 && (
          <RenderCell
            pageDay={date}
            fold={weekFold}
            today={
              getMonth(CalendarData[CalendarData.length - 1].date) !== getMonth(new Date())
                ? new Date(CalendarData[CalendarData.length - 1].date)
                : new Date()
            }
            CalendarData={CalendarData}
            CalendarWithGrayData={CalendarWithGrayData}
          />
        )}
      </Container>
    </Inner>
  );
};
