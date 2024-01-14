import React, { useEffect, useState } from "react";

import { format } from "date-fns";

import arrow from "@/assets/communityPage/storyArrow.svg";
import { CommunityItem } from "@/components/atom/CommunityItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { communityDummy } from "@/dummy/community";
import { Inner } from "@/style/global";

import { CommunityHeader, CommunityItemBox, Container } from "./style";

export const CommunityBox = () => {
  const today = new Date();
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  return (
    <Inner>
      <Container>
        <CommunityHeader>
          <div className="title">
            {width > 560 ? (
              <>
                <MainSemiTitle font={1.25}>
                  {format(today, "M")}월 {format(today, "d")}일, <div className="number">{23}</div>
                  명이 챌린지를 완료했어요.
                </MainSemiTitle>
                <TitleSideBox type="default">오늘</TitleSideBox>
              </>
            ) : (
              <>
                <MainSemiTitle font={1.125}>
                  {format(today, "d")}일,<div className="number second">{23}</div>명이 챌린지를
                  완료했어요.
                </MainSemiTitle>
              </>
            )}
          </div>
          <div className="changeDate">
            <img
              className="previous"
              src={arrow}
              alt="<"
            />
            <div className="today">오늘</div>
            <img
              className="next"
              src={arrow}
              alt="<"
            />
          </div>
        </CommunityHeader>
        <CommunityItemBox>
          {communityDummy.map((item, idx) => (
            <React.Fragment key={idx}>
              <CommunityItem data={item} />
            </React.Fragment>
          ))}
        </CommunityItemBox>
      </Container>
    </Inner>
  );
};
