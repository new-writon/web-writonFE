import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { useRecoilState } from "recoil";

import downArrowActive from "@/assets/communityPage/downArrowActive.svg";
import arrow from "@/assets/communityPage/storyArrow.svg";
import topArrowActive from "@/assets/communityPage/topArrowActive.svg";
import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { CommunityItem } from "@/components/atom/CommunityItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { SubCalendar } from "@/components/atom/SubCalendar";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { KeywordButton } from "@/components/atom/button";
import { communityState, dateLengthState } from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { communityContentProps } from "@/types";

import { CommunityHeader, CommunityItemBox, Container } from "./style";
import { CalendarToggle } from "@/components/atom/CalendarToggle";
import { useCommunityContentData, useCommunityDates } from "@/hooks/reactQueryHooks/useMainHooks";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import useWindowWidth from "@/hooks/useWindowWidth";
import Loading from "@/components/Common/Loading";

const JobCategory = ["기획", "운영", "개발", "마케팅", "홍보", "디자인"];

export const CommunityBox = () => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
  };
  const width = useWindowWidth();

  // const today = new Date();
  const [community, setCommunity] = useRecoilState(communityState);

  const [filteredData, setFilteredData] = useState<communityContentProps[][]>([]);
  const [calendarOn, setCalendarOn] = useState<boolean>(false);
  const [categoriesOn, setCategoriesOn] = useState<boolean>(false);
  const [mobileCategoriesActive, setMobileCategoriesActive] = useState<boolean>(false);

  const [categoriesArray, setCategoriesArray] = useState(["전체"]);
  const [selectedDate, setSelectedDate] = useState<string | Date>("");
  const [dateLength, setDateLength] = useRecoilState(dateLengthState);

  const subCalendarRef = useRef<HTMLDivElement>(null);
  const subCalendarOnRef = useRef<HTMLDivElement>(null);
  useOnclickOutside([subCalendarRef, subCalendarOnRef], () => setCalendarOn(false));

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

  const clickDay = (value: Date | string) => {
    setSelectedDate(communityDates[communityDates.indexOf(format(value, "yyyy-MM-dd"))]);
    localStorage.setItem(
      "selectedDate",
      communityDates[communityDates.indexOf(format(value, "yyyy-MM-dd"))]
    );
    setDateLength(communityDates.indexOf(format(value, "yyyy-MM-dd")));
    setCalendarOn(false);
  };

  const { data: communityDates = [] } = useCommunityDates(organizationChallengeData.challengeId);
  const { data: { challengeCompleteCount, templateData: communityContentData } = {}, isLoading } =
    useCommunityContentData({
      organization: organizationChallengeData.organization,
      challengeId: organizationChallengeData.challengeId,
      selectedDate: localStorage.getItem("selectedDate") || "",
    });
  // communityDates가 로드된 후, 마지막 요소를 selectedDate로 설정
  useEffect(() => {
    if (communityDates && communityDates.length > 0 && !community) {
      // 처음 들어왔을 때만 마지막 날짜 넣어주기
      setDateLength(communityDates.length - 1);
      setSelectedDate(communityDates[communityDates.length - 1]);
      localStorage.setItem("selectedDate", communityDates[communityDates.length - 1]);
      setCommunity(true);
    }
  }, [communityDates]); // communityDates가 변경될 때마다 실행

  // 카테고리에 따른 글 필터링
  useEffect(() => {
    if (categoriesArray.includes("전체")) {
      setFilteredData(communityContentData || []);
    } else {
      setFilteredData(
        (communityContentData || []).filter((item) => categoriesArray.includes(item[0].position))
      );
    }
  }, [categoriesArray, communityContentData]);

  const CommunitySpaceDate = async (type: string) => {
    if (dateLength > 0) {
      switch (type) {
        case "previous":
          setDateLength(dateLength - 1);
          break;
      }
    }
    if (dateLength < communityDates.length - 1) {
      switch (type) {
        case "next":
          setDateLength(dateLength + 1);
          break;
      }
    }
    switch (type) {
      case "today":
        setDateLength(communityDates.length - 1);
        break;
    }
    if (width >= 531) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (communityDates && communityDates.length > 0) {
      setSelectedDate(communityDates[dateLength]);
      localStorage.setItem("selectedDate", communityDates[dateLength]);
    }
  }, [dateLength]);

  useEffect(() => {
    if (width >= 690) {
      setCategoriesOn(false);
    }
  }, []);

  if (!selectedDate && dateLength === 0) {
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
  if (isLoading) return <Loading />; // 스켈레톤 쓰기

  return (
    <Inner>
      <Container>
        <CommunityHeader>
          <div className="title">
            {width > 625 ? (
              <>
                <MainSemiTitle font={1.25}>
                  {format(selectedDate ? selectedDate : new Date(), "M")}월{" "}
                  {format(selectedDate ? selectedDate : new Date(), "d")}일,
                  <div className="number">{challengeCompleteCount || 0}</div>
                  명이 챌린지를 완료했어요.
                </MainSemiTitle>

                {communityDates.length - 1 === dateLength && (
                  <TitleSideBox type="default">오늘</TitleSideBox>
                )}
              </>
            ) : (
              <>
                <MainSemiTitle font={1.25}>
                  {format(selectedDate ? selectedDate : new Date(), "M")}월{" "}
                  {format(selectedDate ? selectedDate : new Date(), "d")}일,
                  <div className="flex">
                    <div className="number">{challengeCompleteCount}</div>
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
                <div
                  className="react-calendar-container"
                  ref={subCalendarRef}
                >
                  <SubCalendar
                    dateActive={communityDates}
                    value={selectedDate}
                    clickDay={clickDay}
                  />
                </div>
              )}
              <div ref={subCalendarOnRef}>
                <CalendarToggle
                  toggle={calendarOn}
                  onClick={() => setCalendarOn(!calendarOn)}
                  page="community"
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
