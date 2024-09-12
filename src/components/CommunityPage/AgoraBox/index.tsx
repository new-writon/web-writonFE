/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { isSameDay } from "date-fns";
import { useRecoilState } from "recoil";

import noSmallTalk from "@/assets/AgoraPage/noSmallTalk.svg";
import smallTalkArrow from "@/assets/AgoraPage/smallTalkArrow.svg";
import arrow from "@/assets/communityPage/storyArrow.svg";
import { AgoraItem, AgoraThrowingTopicItem } from "@/components/atom/AgoraItem";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { SmallTalkTitle } from "@/components/atom/SmallTalkTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { agoraBoxDataState, dateAgoraLengthState } from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { ChallengeCurrentType, communityFirstComponentType } from "@/types";

import { AgoraItemView, Container, NoAgoraView, TodayNoAgoraView } from "./style";
import { useCommunityDates, useGetAgoraData } from "@/hooks/reactQueryHooks/useMainHooks";
import Loading from "@/components/Common/Loading";

export const AgoraBox = ({
  ChallengeCurrent,
  CommunityStats,
}: {
  ChallengeCurrent: ChallengeCurrentType | undefined;
  CommunityStats: communityFirstComponentType | undefined;
}) => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
  };

  const [dateLength, setDateLength] = useRecoilState(dateAgoraLengthState);
  const [agoraData, setAgoraData] = useRecoilState(agoraBoxDataState);

  const [selectedDate, setSelectedDate] = useState<string | Date>("");

  const { data: communityDates = [] } = useCommunityDates(organizationChallengeData.challengeId);

  const { data: fetchAgoraData, isLoading } = useGetAgoraData({
    challengeId: organizationChallengeData.challengeId,
    selectedDate: selectedDate,
  });

  useEffect(() => {
    setAgoraData(fetchAgoraData || []);
  }, [fetchAgoraData]);

  // communityDates가 로드된 후, 마지막 요소를 selectedDate로 설정
  useEffect(() => {
    if (communityDates && communityDates.length > 0) {
      setDateLength(communityDates.length - 1);
      setSelectedDate(communityDates[communityDates.length - 1]);
    }
  }, [communityDates]); // communityDates가 변경될 때마다 실행

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (communityDates && communityDates.length > 0) {
      setSelectedDate(communityDates[dateLength]);
    }
  }, [dateLength]);

  return (
    <Inner>
      <Container>
        <div className="title first agora">
          <MainSemiTitle font={1.25}>
            <span>
              지금 <div className="number">{CommunityStats?.challengeParticipantCount}</div>명이
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
            date={communityDates[dateLength] || new Date().toDateString()}
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
          {isSameDay(communityDates[dateLength], new Date()) && (
            <AgoraThrowingTopicItem type={agoraData?.length === 3 ? "full" : "empty"} />
          )}
          {agoraData?.length === 0 && isSameDay(communityDates[dateLength], new Date()) && (
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
          {isLoading ? (
            <Loading />
          ) : agoraData?.length === 0 && !isSameDay(communityDates[dateLength], new Date()) ? (
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
