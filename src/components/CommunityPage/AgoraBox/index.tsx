/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { format, isSameDay } from "date-fns";
import { useRecoilState } from "recoil";

import { getAgoraData, getCommunityDate } from "@/apis/CommunityPage";
import arrow from "@/assets/communityPage/storyArrow.svg";
import { AgoraItem, AgoraThrowingTopicItem } from "@/components/atom/AgoraItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { SmallTalkTitle } from "@/components/atom/SmallTalkTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { agoraBoxDataState, dateAgoraActiveState, dateAgoraLengthState } from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { ChallengeCurrentType, communityFirstComponentType } from "@/types";

import { AgoraItemView, Container } from "./style";

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
        try {
          const result = await getAgoraData(
            localStorage.getItem("challengeId") || "1",
            dateArray[dateArray.length - 1]
          );
          setAgoraData(result);
        } catch {
          throw new Error("shit");
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
    ChangeDate();
  }, [dateLength]);

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
        <div className="title first">
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
            date={dateActive[dateLength] || "2024-01-02"}
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
          {/* 아고라데이터 없을 때 보여줄 곳 */}
          {agoraData?.map((agoraData, idx) => (
            <React.Fragment key={idx}>
              <AgoraItem data={agoraData} />
            </React.Fragment>
          ))}
        </AgoraItemView>
      </Container>
    </Inner>
  );
};
