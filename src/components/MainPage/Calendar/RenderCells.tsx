/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarWeeks,
  getDay,
  getMonth,
} from "date-fns";
import { isSameMonth, isSameDay, addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

import goldBadgeRound from "@/assets/mainPage/goldBadge-round.svg";
import goldBadge from "@/assets/mainPage/goldBadge.svg";
import preBtn_round_blue from "@/assets/mainPage/preBtn-round_blue.svg";
import preBtn_round_purple from "@/assets/mainPage/preBtn-round_purple.svg";
import silverBadgeRound from "@/assets/mainPage/silverBadge-round.svg";
import silverBadge from "@/assets/mainPage/silverBadge.svg";
import todayBtn_blue from "@/assets/mainPage/todayBtn-round_blue.svg";
import todayBtn_purple from "@/assets/mainPage/todayBtn-round_purple.svg";
import writeNotSpecified_blue from "@/assets/mainPage/writeActiveClick_blue.svg";
import writeClick_blue from "@/assets/mainPage/writeActiveClick_blue.svg";
import writeNotSpecified_purple from "@/assets/mainPage/writeActiveClick_purple.svg";
import writeClick_purple from "@/assets/mainPage/writeActiveClick_purple.svg";
import writeActiveHover_blue from "@/assets/mainPage/writeActiveHover_blue.svg";
import writeActiveHover_purple from "@/assets/mainPage/writeActiveHover_purple.svg";
import writeActive_blue from "@/assets/mainPage/writeActive_blue.svg";
import writeActive_purple from "@/assets/mainPage/writeActive_purple.svg";
import writePre_blue from "@/assets/mainPage/writePre_blue.svg";
import writePre_purple from "@/assets/mainPage/writePre_purple.svg";
import writeING_round_blue from "@/assets/writingPage/writingING-round_blue.svg";
import writeING_round_purple from "@/assets/writingPage/writingING-round_purple.svg";
import writeINGtoday_round_blue from "@/assets/writingPage/writingINGToday-round_blue.svg";
import writeINGtoday_round_purple from "@/assets/writingPage/writingINGToday-round_purple.svg";
import writeING_blue from "@/assets/writingPage/writingING_blue.svg";
import writeING_purple from "@/assets/writingPage/writingING_purple.svg";
import writeINGtoday_blue from "@/assets/writingPage/writingINGtoday_blue.svg";
import writeINGtoday_purple from "@/assets/writingPage/writingINGtoday_purple.svg";
import { CalendarRecordCurrentType } from "@/types";

import { Container } from "./RenderCells.style";

const writeButtons = {
  writeNotSpecified:
    localStorage.getItem("organization") === "렛츠인턴"
      ? writeNotSpecified_purple
      : writeNotSpecified_blue,
  writeActiveHover:
    localStorage.getItem("organization") === "렛츠인턴"
      ? writeActiveHover_purple
      : writeActiveHover_blue,
  writeActive:
    localStorage.getItem("organization") === "렛츠인턴" ? writeActive_purple : writeActive_blue,
  writeClick:
    localStorage.getItem("organization") === "렛츠인턴" ? writeClick_purple : writeClick_blue,
  writePre: localStorage.getItem("organization") === "렛츠인턴" ? writePre_purple : writePre_blue,
  preBtn_round:
    localStorage.getItem("organization") === "렛츠인턴" ? preBtn_round_purple : preBtn_round_blue,
  todayBtn: localStorage.getItem("organization") === "렛츠인턴" ? todayBtn_purple : todayBtn_blue,
  writeING_round:
    localStorage.getItem("organization") === "렛츠인턴"
      ? writeING_round_purple
      : writeING_round_blue,
  writeINGtoday_round:
    localStorage.getItem("organization") === "렛츠인턴"
      ? writeINGtoday_round_purple
      : writeINGtoday_round_blue,
  writeING: localStorage.getItem("organization") === "렛츠인턴" ? writeING_purple : writeING_blue,
  writeINGtoday:
    localStorage.getItem("organization") === "렛츠인턴" ? writeINGtoday_purple : writeINGtoday_blue,
};

export const RenderCell = React.memo(
  ({
    pageDay,
    fold,
    today,
    CalendarData,
  }: {
    pageDay: string | undefined;
    fold: boolean;
    today: Date;
    CalendarData: CalendarRecordCurrentType[];
  }) => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [mouseClick, setMouseClick] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(window.innerWidth);
    // const today =
    //   getMonth(CalendarData[CalendarData.length - 1].date) !== getMonth(new Date())
    //     ? new Date(CalendarData[CalendarData.length - 1].date)
    //     : new Date(); // 월이 바뀌면 챌린지 마지막날 유지
    const finishDay = getMonth(CalendarData[CalendarData.length - 1].date) === getMonth(new Date());

    const monthStart = startOfMonth(today); // 1월 1일 (그 달의 시작이 나오게 됨.)
    const monthEnd = endOfMonth(today); // 1월 31일이 나옴.(그 달의 끝)
    const startDate = startOfWeek(monthStart); // 해당 날짜의 해당 주의 시작 날짜
    const endDate = endOfWeek(monthEnd); // 해당 날짜의 해당 주의 끝 날짜
    const weekNumber =
      getDay(today) === 0
        ? differenceInCalendarWeeks(today, monthStart) - 1
        : differenceInCalendarWeeks(today, monthStart); // 몇주차인지
    const pageWeekNumber =
      getDay(pageDay || today) === 0
        ? differenceInCalendarWeeks(pageDay || today, monthStart) - 1
        : differenceInCalendarWeeks(pageDay || today, monthStart);

    // addDays(startDate, 1);

    const mouseEvent = (isTODAY: boolean, type: string, clickDay: string) => {
      // 오늘만 이동 가능 추가로 안쓴 날도 이동가능, 안쓴날은 따로 체크해야할듯
      if (isTODAY) {
        switch (type) {
          case "mouseOver":
            setIsHover(true);
            break;
          case "mouseOut":
            setIsHover(false);
            break;
          case "mouseDown":
            setMouseClick(true);
            break;
          case "mouseClick":
            const date = encodeURI(encodeURIComponent(clickDay));
            if (pageDay) {
              alert("날짜 변경!");
              navigate(`/writing/${date}`);
              //return 해서 여기에 모달창 컴포넌트 바로 붙여넣기
              // recoil 값 변경해서 모달창 뜨게끔 만든다. 그리고 버튼 누르면 이동하게끔 진짜 이동할거냐
            } else {
              navigate(`/writing/${date}`);
            }
            break;
        }
      }
    };
    const responsiveClickEvent = (isTODAY: boolean, clickDay: string) => {
      if (isTODAY) {
        if (width <= 530) {
          const date = encodeURI(encodeURIComponent(clickDay));
          if (pageDay) {
            alert("날짜 변경!");
            navigate(`/writing/${date}`);
            //return 해서 여기에 모달창 컴포넌트 바로 붙여넣기
            // recoil 값 변경해서 모달창 뜨게끔 만든다. 그리고 버튼 누르면 이동하게끔 진짜 이동할거냐
          } else {
            navigate(`/writing/${date}`);
          }
        }
      }
    };
    const SelectBadge = (day: Date) => {
      let BadgeColor = writeButtons.writeNotSpecified;
      //badge 선택 함수
      CalendarData.map((item) => {
        if (isSameDay(day, item.date)) {
          switch (item.badge) {
            case "lightPurple":
              BadgeColor = writeButtons.writePre;
              break;
            case "Gold":
              BadgeColor = goldBadge;
              break;
            case "Silver":
              BadgeColor = silverBadge;
              break;
            case "Purple":
              BadgeColor = writeButtons.writeActive;
              break;
          }
        }
      });
      return BadgeColor;
    };
    const handleResize = () => {
      //뷰크기 강제로 강져오기
      setWidth(window.innerWidth);
    };
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize); //clean
    }, [width]);

    const rows = [];
    let days = [];
    let day = addDays(startDate, 1); // 월요일부터 보이게 하기 위해서 (원래 일요일부터 보임)
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = !isSameMonth(day, monthStart) ? format(day, "M.d") : format(day, "d"); //formattedDate랑 같은 값만 서버값이랑 비교해서 처리하면 된다.
        const clickDay = day;
        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) // 1월이면 12월 2월 비활성화
                ? "disabled"
                : pageDay === "" && isSameDay(day, today) && finishDay // 오늘 날짜 나올때까지 돌리기 오늘날짜 select!!
                  ? "selected"
                  : format(today, "M") === format(day, "M") // 해당 달이면 활성화
                    ? "valid"
                    : ""
            } ${i === 5 || i === 6 ? "weekend" : ""} ${
              pageDay !== "" && isSameDay(day, pageDay || "") ? "selected" : ""
            }`}
          >
            <div
              className={`innerday ${
                SelectBadge(day) === writeButtons.writeActive ||
                SelectBadge(day) === writeButtons.writePre
                  ? "Active"
                  : "notActive"
              }`} // 반응형을 위한 코드
              onClick={() =>
                responsiveClickEvent(
                  SelectBadge(clickDay) === writeButtons.writeActive ||
                    SelectBadge(clickDay) === writeButtons.writePre
                    ? true
                    : false,
                  format(clickDay, "yyyy-MM-dd")
                )
              } // 반응형을 위한 코드
            >
              <div
                className={
                  format(today, "M") !== format(day, "M") ? "text not-valid" : "text valid"
                }
              >
                {Number(format(day, "d")) > Number(format(today, "d")) &&
                isSameMonth(day, monthStart) ? (
                  ""
                ) : (
                  <img
                    className={
                      SelectBadge(day) === writeButtons.writeActive
                        ? "writeActive"
                        : SelectBadge(day) === writeButtons.writePre
                          ? "writePre"
                          : SelectBadge(day) === writeButtons.writeNotSpecified
                            ? "writeNotSpecified"
                            : ""
                    }
                    src={
                      //모바일
                      isSameDay(pageDay || "", day) && isSameDay(pageDay || "", today)
                        ? writeButtons.writeINGtoday_round
                        : isSameDay(pageDay || "", day)
                          ? writeButtons.writeING_round
                          : SelectBadge(day) === writeButtons.writeActive
                            ? writeButtons.todayBtn
                            : SelectBadge(day) === goldBadge
                              ? goldBadgeRound
                              : SelectBadge(day) === silverBadge
                                ? silverBadgeRound
                                : SelectBadge(day) === writeButtons.writePre
                                  ? writeButtons.preBtn_round
                                  : ""
                    }
                    alt="반응형 뱃지"
                  />
                )}
                {formattedDate}
              </div>
              {Number(format(day, "d")) > Number(format(today, "d")) &&
              isSameMonth(day, monthStart) ? ( // 이미지 안나와여하는것 : 주말, 오늘 이후 날짜들, 다른 달 짜투리들
                <img
                  className="virtualImg"
                  src={silverBadge} //상관없음. 어차피 opacity 0
                  alt="virtual"
                />
              ) : (
                <img
                  onMouseOver={() => mouseEvent(isSameDay(clickDay, today), "mouseOver", "")}
                  onMouseOut={() => mouseEvent(isSameDay(clickDay, today), "mouseOut", "")}
                  onMouseDown={() => mouseEvent(isSameDay(clickDay, today), "mouseDown", "")}
                  onClick={() =>
                    mouseEvent(
                      SelectBadge(clickDay) === writeButtons.writeActive ||
                        SelectBadge(clickDay) === writeButtons.writePre
                        ? true
                        : false,
                      "mouseClick",
                      format(clickDay, "yyyy-MM-dd")
                    )
                  }
                  className={
                    SelectBadge(day) === writeButtons.writeActive
                      ? "writeActive"
                      : SelectBadge(day) === writeButtons.writePre
                        ? "writePre"
                        : SelectBadge(day) === writeButtons.writeNotSpecified
                          ? "writeNotSpecified"
                          : ""
                  }
                  src={
                    isSameDay(pageDay || "", day) && isSameDay(pageDay || "", today)
                      ? writeButtons.writeINGtoday
                      : isSameDay(pageDay || "", day)
                        ? writeButtons.writeING
                        : SelectBadge(day) === writeButtons.writeActive
                          ? mouseClick
                            ? writeButtons.writeClick
                            : isHover
                              ? writeButtons.writeActiveHover
                              : writeButtons.writeActive
                          : SelectBadge(day) // 여기서 부터 로직 작성, 오늘이 아닌데, 어떤 값이 false면 그 write사진 writePre로 변경  Status, todayStatus값으로 구분 f,f면 아에 안쓴거(오늘날짜, 아닌날짜 구분까지 플러스하기), t,f면 실버색깔, t,t 금색깔
                  }
                  alt="성공"
                />
              )}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(<div className="row">{days}</div>);
      days = [];
    }
    return (
      <Container>
        {pageDay === "" //메인이라는 뜻
          ? fold
            ? rows
            : rows[weekNumber]
          : fold
            ? rows[pageWeekNumber]
            : ""}
      </Container>
    );
  }
);
