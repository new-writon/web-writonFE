/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { format } from "date-fns";

import { getCommunityContentData, getCommunityDate } from "@/apis/CommunityPage";
import arrow from "@/assets/communityPage/storyArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { CommunityItem } from "@/components/atom/CommunityItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { Inner } from "@/style/global";
import { communitySecondCoponentType } from "@/types";

import { CommunityHeader, CommunityItemBox, Container } from "./style";

export const CommunityBox = () => {
  // const today = new Date();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [dateActive, setDateActive] = useState<string[]>([]);
  const [dateLength, setDateLength] = useState<number>(-1);
  const [dateLastLength, setDateLastLength] = useState<number>(0);
  const [CommunitySecondData, setCommunitySecondData] = useState<communitySecondCoponentType>();

  const CommunitySecondRendering = async () => {
    if (dateLength !== -1 || !dateActive) {
      try {
        const result = await getCommunityContentData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          dateActive[dateLength]
        );
        setCommunitySecondData(result);
      } catch {
        throw new Error("shit");
      }
    } else {
      try {
        const response = await getCommunityDate(localStorage.getItem("challengeId") || "1");
        const dateArray = response.map((item) => format(item, "yyyy-MM-dd"));
        setDateActive(dateArray);
        setDateLength(dateArray.length - 1);
        setDateLastLength(dateArray.length - 1);
        try {
          const result = await getCommunityContentData(
            localStorage.getItem("organization") || "",
            localStorage.getItem("challengeId") || "1",
            dateArray[dateArray.length - 1]
          );
          setCommunitySecondData(result);
        } catch {
          throw new Error("shit");
        }
      } catch {
        throw new Error("shit");
      }
    }
  };

  const CommunitySpaceDate = async (type: string) => {
    if (dateLength > 0) {
      switch (type) {
        case "previous":
          setDateLength(dateLength - 1);
          break;
      }
    }
    if (dateLength < dateLastLength) {
      switch (type) {
        case "next":
          setDateLength(dateLength + 1);
          break;
      }
    }
    switch (type) {
      case "today":
        setDateLength(dateLastLength);
        break;
    }
  };

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  useEffect(() => {
    CommunitySecondRendering();
  }, [dateLength]);

  if (!dateActive || dateLength === -1) {
    return <></>;
  }

  return (
    <Inner>
      <Container>
        <CommunityHeader>
          <div className="title">
            {width > 560 ? (
              <>
                <MainSemiTitle font={1.25}>
                  {format(dateActive[dateLength], "M")}월 {format(dateActive[dateLength], "d")}일,
                  <div className="number">{CommunitySecondData?.challengeCompleteCount}</div>
                  명이 챌린지를 완료했어요.
                </MainSemiTitle>
                {dateLastLength === dateLength && <TitleSideBox type="default">오늘</TitleSideBox>}
              </>
            ) : (
              <>
                <MainSemiTitle font={1.25}>
                  {format(dateActive[dateLength], "M")}월 {format(dateActive[dateLength], "d")}일,
                  <div className="flex">
                    <div className="number">{CommunitySecondData?.challengeCompleteCount}</div>
                    명이 챌린지를 완료했어요.
                  </div>
                </MainSemiTitle>
              </>
            )}
          </div>
          <div className="changeDate">
            <img
              className="previous"
              src={arrow}
              alt="<"
              onClick={() => CommunitySpaceDate("previous")}
            />
            <div
              className="today"
              onClick={() => CommunitySpaceDate("today")}
            >
              오늘
            </div>
            <img
              className="next"
              src={arrow}
              alt="<"
              onClick={() => CommunitySpaceDate("next")}
            />
          </div>
        </CommunityHeader>
        {CommunitySecondData?.templateData?.length !== 0 ? (
          <CommunityItemBox>
            {CommunitySecondData?.templateData.map((item, idx) => (
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
