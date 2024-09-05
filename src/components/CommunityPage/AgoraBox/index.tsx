/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { format, isSameDay } from "date-fns";
import { useRecoilState } from "recoil";

import { getAgoraData, getCommunityDate } from "@/apis/CommunityPage";
import noSmallTalk from "@/assets/AgoraPage/noSmallTalk.svg";
import smallTalkArrow from "@/assets/AgoraPage/smallTalkArrow.svg";
import arrow from "@/assets/communityPage/storyArrow.svg";
import { AgoraItem, AgoraThrowingTopicItem } from "@/components/atom/AgoraItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { SmallTalkTitle } from "@/components/atom/SmallTalkTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { agoraBoxDataState, dateAgoraActiveState, dateAgoraLengthState } from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { ChallengeCurrentType, communityFirstComponentType } from "@/types";

import { AgoraItemView, Container, NoAgoraView, TodayNoAgoraView } from "./style";

export const AgoraBox = ({
  ChallengeCurrent,
  CommunityFirstData,
}: {
  ChallengeCurrent: ChallengeCurrentType | undefined;
  CommunityFirstData: communityFirstComponentType | undefined;
}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [dateActive, setDateActive] = useRecoilState(dateAgoraActiveState);
  const [dateLength, setDateLength] = useRecoilState(dateAgoraLengthState);
  const [agoraData, setAgoraData] = useRecoilState(agoraBoxDataState);
  const executeAsyncTask = useAsyncWithLoading();

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
  };

  const ChangeDate = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await getAgoraData(
          localStorage.getItem("challengeId") || "1",
          dateActive[dateLength]
        );
        setAgoraData(result);
      } catch {
        throw new Error("shit");
      }
    });
  };

  const CommunitAgoraRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const response = await getCommunityDate(localStorage.getItem("challengeId") || "1");
        const dateArray = response.map((item) => format(item, "yyyy-MM-dd"));
        setDateActive(dateArray);
        setDateLength(dateArray.length - 1);
        if (dateArray.length > 0) {
          const result = await getAgoraData(
            localStorage.getItem("challengeId") || "1",
            dateArray[dateArray.length - 1]
          );
          setAgoraData(result);
        }
      } catch {
        throw new Error("shit");
      }
    });
  };
  useEffect(() => {
    CommunitAgoraRendering();
  }, []);

  useEffect(() => {
    if (dateActive[dateLength]) {
      // dateActive 배열이 준비된 후 ChangeDate 함수 호출
      ChangeDate();
    }
  }, [dateLength, dateActive]);

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
        <div className="title first agora">
          <MainSemiTitle font={1.25}>
            <span>
              지금 <div className="number">{CommunityFirstData?.challengeParticipantCount}</div>명이
              함께&nbsp;
            </span>
            {ChallengeCurrent?.organization} {ChallengeCurrent?.challenge} 챌린지 도전중!
          </MainSemiTitle>
          {/* 이미지 들어가야함. */}
          <TitleSideBox type="default">
            {Math.sign(ChallengeCurrent?.overlapPeriod || -1) === -1
              ? "END"
              : `D-${ChallengeCurrent?.overlapPeriod}` || "Day"}
          </TitleSideBox>
        </div>
        <div className="title-and-date">
          <SmallTalkTitle
            date={dateActive[dateLength] || new Date().toDateString()}
            number={agoraData.length}
          />
          <div className="change-date">
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
        <AgoraItemView>
          {isSameDay(dateActive[dateLength], new Date()) && (
            <AgoraThrowingTopicItem type={agoraData?.length === 3 ? "full" : "empty"} />
          )}
          {agoraData?.length === 0 && isSameDay(dateActive[dateLength], new Date()) && (
            <TodayNoAgoraView>
              <span>
                아직 등록된 스몰톡이 없네요.
                <br /> 먼저 이야기를 꺼내볼까요? 💬
              </span>
              <img
                src={smallTalkArrow}
                alt="<-"
              />
            </TodayNoAgoraView>
          )}
          {agoraData?.length === 0 && !isSameDay(dateActive[dateLength], new Date()) ? (
            <NoAgoraView>
              <img
                src={noSmallTalk}
                alt="없습니다"
              />
              <span>등록된 스몰톡이 없어요.</span>
            </NoAgoraView>
          ) : (
            agoraData?.map((agoraData, idx) => (
              <React.Fragment key={idx}>
                <AgoraItem data={agoraData} />
              </React.Fragment>
            ))
          )}
        </AgoraItemView>
      </Container>
    </Inner>
  );
};
