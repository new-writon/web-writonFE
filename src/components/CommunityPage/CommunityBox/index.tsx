/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import moment from "moment";
import Calendar from "react-calendar";
import { useRecoilState } from "recoil";
import "react-calendar/dist/Calendar.css";

import { getCommunityContentData, getCommunityDate } from "@/apis/CommunityPage";
import downArrowActive from "@/assets/communityPage/downArrowActive.svg";
import calendarIMG from "@/assets/communityPage/icon-calendar.svg";
import arrow from "@/assets/communityPage/storyArrow.svg";
import topArrowActive from "@/assets/communityPage/topArrowActive.svg";
import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { CommunityItem } from "@/components/atom/CommunityItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { KeywordButton } from "@/components/atom/button";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import {
  CommunitySecondDataState,
  communityState,
  dateActiveState,
  dateLengthState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { communityContentProps, communitySecondCoponentType } from "@/types";

import { CommunityHeader, CommunityItemBox, Container } from "./style";

const JobCategory = ["기획", "운영", "개발", "마케팅", "홍보", "디자인"];

export const CommunityBox = () => {
  // const today = new Date();
  const [community, setCommunity] = useRecoilState(communityState);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [dateActive, setDateActive] = useRecoilState(dateActiveState);
  const [dateLength, setDateLength] = useRecoilState(dateLengthState);
  const [dateLastLength, setDateLastLength] = useState<number>(0);
  const [CommunitySecondData, setCommunitySecondData] =
    useRecoilState<communitySecondCoponentType>(CommunitySecondDataState);
  const [filteredData, setFilteredData] = useState<communityContentProps[][]>([]);
  const [calendarOn, setCalendarOn] = useState<boolean>(false);
  const [categoriesOn, setCategoriesOn] = useState<boolean>(false);
  const [mobileCategoriesActive, setMobileCategoriesActive] = useState<boolean>(false);

  const executeAsyncTask = useAsyncWithLoading();
  const [categoriesArray, setCategoriesArray] = useState(["전체"]);

  const ChangeCategories = (item: string) => {
    if (item !== "전체") {
      setMobileCategoriesActive(true);
      setCategoriesArray((prevCategories) => {
        // '전체'를 제외한 모든 값들을 유지하고 item이 이미 있는지 확인하여 처리
        if (prevCategories.includes(item)) {
          // item이 이미 존재하면 item을 배열에서 제거하고 '전체'를 추가
          const updatedCategories = prevCategories.filter((element: string) => element !== item);
          // 모든 카테고리가 해제되었을 때 배열에 "전체" 추가
          if (updatedCategories.length === 0) {
            setMobileCategoriesActive(false);
            return ["전체"];
          } else {
            return updatedCategories;
          }
        } else {
          // item이 존재하지 않으면 '전체'를 제거하고 item을 배열에 추가
          return [...prevCategories.filter((element: string) => element !== "전체"), item];
        }
      });
    } else {
      setMobileCategoriesActive(false);
      setCategoriesArray(["전체"]);
    }
  };

  useEffect(() => {
    if (categoriesArray.includes("전체")) {
      setFilteredData(CommunitySecondData.templateData); // "전체"를 선택한 경우, 모든 데이터를 보여줍니다.
    } else {
      const filtered = CommunitySecondData.templateData.filter((item) =>
        categoriesArray.includes(item[0].job)
      ); // 선택한 카테고리에 해당하는 데이터를 필터링합니다.
      setFilteredData(filtered);
    }
  }, [categoriesArray]);

  const clickDay = (value: Date) => {
    executeAsyncTask(async () => {
      try {
        const result = await getCommunityContentData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          format(value, "yyyy-MM-dd")
        );
        localStorage.setItem("date", format(value, "yyyy-MM-dd"));
        setDateLength(dateActive.indexOf(format(value, "yyyy-MM-dd")));
        setCommunitySecondData(result);

        // 카테고리에 따른 글 필터링
        if (categoriesArray.includes("전체")) {
          setFilteredData(result.templateData); // "전체"를 선택한 경우, 모든 데이터를 보여줍니다.
        } else {
          const filtered = result.templateData.filter((item) =>
            categoriesArray.includes(item[0].job)
          ); // 선택한 카테고리에 해당하는 데이터를 필터링합니다.
          setFilteredData(filtered);
        }
        setCalendarOn(false);
      } catch {
        throw new Error("shit");
      }
    });
  };

  const CommunitySecondRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const response = await getCommunityDate(localStorage.getItem("challengeId") || "1");
        const dateArray = response.map((item) => format(item, "yyyy-MM-dd"));
        setDateActive(dateArray);
        setDateLength(dateArray.length - 1);
        setDateLastLength(dateArray.length - 1);
        localStorage.setItem("dateLastLength", (dateArray.length - 1).toString());
        localStorage.setItem("date", dateArray[dateArray.length - 1]);
        try {
          const result = await getCommunityContentData(
            localStorage.getItem("organization") || "",
            localStorage.getItem("challengeId") || "1",
            dateArray[dateArray.length - 1]
          );
          setCommunitySecondData(result);

          // 카테고리에 따른 글 필터링
          if (categoriesArray.includes("전체")) {
            setFilteredData(result.templateData); // "전체"를 선택한 경우, 모든 데이터를 보여줍니다.
          } else {
            const filtered = result.templateData.filter((item) =>
              categoriesArray.includes(item[0].job)
            ); // 선택한 카테고리에 해당하는 데이터를 필터링합니다.
            setFilteredData(filtered);
          }
        } catch {
          throw new Error("shit");
        }
      } catch {
        throw new Error("shit");
      }
    });
  };

  const ChangeDate = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await getCommunityContentData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          dateActive[dateLength]
        );
        setCommunitySecondData(result);

        // 카테고리에 따른 글 필터링
        if (categoriesArray.includes("전체")) {
          setFilteredData(result.templateData); // "전체"를 선택한 경우, 모든 데이터를 보여줍니다.
        } else {
          const filtered = result.templateData.filter((item) =>
            categoriesArray.includes(item[0].job)
          ); // 선택한 카테고리에 해당하는 데이터를 필터링합니다.
          setFilteredData(filtered);
        }
      } catch {
        throw new Error("shit");
      }
    });
  };

  const CommunitySpaceDate = async (type: string) => {
    if (dateLength > 0) {
      switch (type) {
        case "previous":
          setDateLength(dateLength - 1);
          break;
      }
    }
    if (dateLength < dateActive.length - 1) {
      switch (type) {
        case "next":
          setDateLength(dateLength + 1);
          break;
      }
    }
    switch (type) {
      case "today":
        setDateLength(dateActive.length - 1);
        break;
    }
    window.scrollTo({ top: 0 });
    localStorage.setItem("date", dateActive[dateLength]);
  };

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (width >= 690) {
      setCategoriesOn(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  useEffect(() => {
    if (!community) {
      //처음 커뮤니티 접근했을 때만 렌더링
      CommunitySecondRendering();
      setCommunity(true);
    }
  }, []);

  useEffect(() => {
    ChangeDate();
    localStorage.setItem("date", dateActive[dateLength]);
  }, [dateLength]);

  if (!dateActive || dateLength === -1) {
    return (
      <Inner>
        <Container>
          <div className="nodata">
            <NoRetrospect type="community" />
          </div>
        </Container>
      </Inner>
    );
  }

  return (
    <Inner>
      <Container>
        <CommunityHeader>
          <div className="title">
            {width > 625 ? (
              <>
                <MainSemiTitle font={1.25}>
                  {format(localStorage.getItem("date") || dateActive[dateLength], "M")}월{" "}
                  {format(localStorage.getItem("date") || dateActive[dateLength], "d")}일,
                  <div className="number">{CommunitySecondData?.challengeCompleteCount}</div>
                  명이 챌린지를 완료했어요.
                </MainSemiTitle>
                {dateLastLength === dateLength && <TitleSideBox type="default">오늘</TitleSideBox>}
              </>
            ) : (
              <>
                <MainSemiTitle font={1.25}>
                  {format(localStorage.getItem("date") || dateActive[dateLength], "M")}월{" "}
                  {format(localStorage.getItem("date") || dateActive[dateLength], "d")}일,
                  <div className="flex">
                    <div className="number">{CommunitySecondData?.challengeCompleteCount}</div>
                    명이 챌린지를 완료했어요.
                  </div>
                </MainSemiTitle>
              </>
            )}
          </div>
          <div className="categoryAndDate">
            {width <= 690 ? (
              <div
                className={`${mobileCategoriesActive && "categoriesMobileActvie"} categoriesMobile`}
                onClick={() => setCategoriesOn(!categoriesOn)}
              >
                <p>직무별</p>
                <img
                  src={
                    mobileCategoriesActive
                      ? categoriesOn
                        ? topArrowActive
                        : downArrowActive
                      : categoriesOn
                        ? topArrow
                        : downArrow
                  }
                  alt="v"
                />
              </div>
            ) : (
              <div className="categories">
                <KeywordButton
                  onClick={() => ChangeCategories("전체")}
                  select={categoriesArray.includes("전체")}
                >
                  전체
                </KeywordButton>
                <div className="line"></div>
                {JobCategory.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <KeywordButton
                      onClick={() => ChangeCategories(item)}
                      select={categoriesArray.includes(item)}
                    >
                      {item}
                    </KeywordButton>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="changeDate">
              {calendarOn && (
                <Calendar
                  locale="ko"
                  formatDay={(_locale, date) => moment(date).format("D")}
                  value={localStorage.getItem("date")}
                  minDate={new Date(dateActive[0])}
                  maxDate={new Date(dateActive[Number(localStorage.getItem("dateLastLength"))])}
                  minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                  maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                  onClickDay={clickDay}
                  goToRangeStartOnSelect={true}
                  tileDisabled={({ date }) => {
                    // 비활성화할 날짜들을 포함하는 Set 객체 생성
                    const disabledDates = new Set(
                      dateActive.map((dateString) => new Date(dateString).toDateString())
                    );
                    // 현재 날짜가 비활성화할 날짜 목록에 포함되어 있는지 확인하여 반환
                    return !disabledDates.has(date.toDateString());
                  }}
                />
              )}
              <div
                className="calendar"
                onClick={() => setCalendarOn(!calendarOn)}
              >
                <img
                  src={calendarIMG}
                  alt="달력"
                />
                <img
                  src={calendarOn ? topArrow : downArrow}
                  alt="v"
                />
              </div>
              <div
                className="today"
                onClick={() => CommunitySpaceDate("today")}
              >
                오늘
              </div>
              <img
                className="previous"
                src={arrow}
                alt="<"
                onClick={() => CommunitySpaceDate("previous")}
              />

              <img
                className="next"
                src={arrow}
                alt="<"
                onClick={() => CommunitySpaceDate("next")}
              />
            </div>
          </div>
          {categoriesOn && (
            <div className="categoriesMobileView">
              <KeywordButton
                onClick={() => ChangeCategories("전체")}
                select={categoriesArray.includes("전체")}
              >
                전체
              </KeywordButton>
              {JobCategory.map((item, idx) => (
                <React.Fragment key={idx}>
                  <KeywordButton
                    onClick={() => ChangeCategories(item)}
                    select={categoriesArray.includes(item)}
                  >
                    {item}
                  </KeywordButton>
                </React.Fragment>
              ))}
            </div>
          )}
        </CommunityHeader>
        {filteredData?.length !== 0 ? (
          <CommunityItemBox>
            {filteredData?.map((item, idx) => (
              <React.Fragment key={idx}>
                <CommunityItem data={item} />
              </React.Fragment>
            ))}
          </CommunityItemBox>
        ) : (
          <NoRetrospect type="community" />
        )}
      </Container>
    </Inner>
  );
};
