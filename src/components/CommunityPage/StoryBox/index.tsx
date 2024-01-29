import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import Slider from "react-slick";
import styled from "styled-components";

import arrow from "@/assets/communityPage/storyArrow.svg";
import close from "@/assets/mainPage/close.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { StoryItem } from "@/components/atom/StoryItem";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { Inner } from "@/style/global";
import { communityFirstComponentType, communityStoryProps } from "@/types";

import {
  Container,
  ArrowButton,
  StoryItemBox,
  StoryItemBoxResponsive,
  IntroducePopup,
} from "./style";

export const StoryBox = ({
  CommunityFirstData,
  myCommunityStoryData,
}: {
  CommunityFirstData: communityFirstComponentType | undefined;
  myCommunityStoryData: communityStoryProps | undefined;
}) => {
  const [xValue, setXValue] = useState<number>(0);
  const [popOn, setPopOn] = useState<boolean>(false);
  const slickRef = useRef<Slider | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [popUpdata, setPopUpdata] = useState<communityStoryProps>();

  const REACT_SLIDER_SETTINGS = {
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 1,
    speed: 700,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1015,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);

  const PopupOn = (e: MouseEvent<HTMLDivElement>, data: communityStoryProps | undefined) => {
    if (width >= 1140) {
      setXValue(e.clientX - (width - 1080) / 2);
    } else {
      setXValue(e.clientX);
    }
    setPopUpdata(data);
    setPopOn(true);
  };

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
            <p>
              지금 <div className="number">{CommunityFirstData?.challengeParticipantCount}</div>명이
              함께&nbsp;
            </p>
            {`렛츠인턴 ${format(new Date(), "M월")} TIL 챌린지`} 도전중!
          </MainSemiTitle>
          <TitleSideBox type="default">D-{CommunityFirstData?.challengeOverlapPeriod}</TitleSideBox>
        </div>
        <StoryItemBox>
          <StyledSlider
            {...REACT_SLIDER_SETTINGS}
            ref={slickRef}
          >
            <StoryItem
              data={myCommunityStoryData}
              someone={"me"}
              onClick={(e) => PopupOn(e, myCommunityStoryData)}
            />
            {CommunityFirstData?.participantData.map((data, idx) => (
              <React.Fragment key={idx}>
                <StoryItem
                  data={data}
                  someone={"other"}
                  onClick={(e) => PopupOn(e, data)}
                />
              </React.Fragment>
            ))}
          </StyledSlider>
          {popOn && (
            <IntroducePopup $xValue={xValue}>
              <div className="userInfo">
                <div className="name">
                  {popUpdata?.nickname}
                  <img
                    src={close}
                    alt="X"
                    onClick={() => setPopOn(false)}
                  />
                </div>
                <div className="userAddInfo">
                  <div className="job">{popUpdata?.job}</div>
                  <div className={`company ${popUpdata?.company === null && "none"}`}>
                    {popUpdata?.company}
                  </div>
                </div>
              </div>
              <div className="oneline">{popUpdata?.job_introduce}</div>
            </IntroducePopup>
          )}

          <ArrowButton onClick={previous}>
            <img
              className="previous"
              src={arrow}
              alt="<"
            />
          </ArrowButton>
          <ArrowButton onClick={next}>
            <img
              className="next"
              src={arrow}
              alt=">"
            />
          </ArrowButton>
        </StoryItemBox>

        <div className="responsive">
          <StoryItemBoxResponsive>
            <StoryItem
              data={myCommunityStoryData}
              someone={"me"}
              onClick={() => {}}
            />
            {CommunityFirstData?.participantData.map((data, idx) => (
              <React.Fragment key={idx}>
                <StoryItem
                  data={data}
                  someone={"other"}
                  onClick={(e) => PopupOn(e, data)}
                />
              </React.Fragment>
            ))}
          </StoryItemBoxResponsive>
          {popOn && (
            <IntroducePopup $xValue={xValue}>
              <div className="userInfo">
                <div className="name">
                  {popUpdata?.nickname}
                  <img
                    src={close}
                    alt="X"
                    onClick={() => setPopOn(false)}
                  />
                </div>
                <div className="userAddInfo">
                  <div className="job">{popUpdata?.job}</div>
                  <div className="company">{popUpdata?.company}</div>
                </div>
              </div>
              <div className="oneline">{popUpdata?.job_introduce}</div>
            </IntroducePopup>
          )}
        </div>
      </Container>
    </Inner>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  margin: 0 auto;

  .slick-track {
    display: flex;
    gap: 8px;
    margin: 0;
  }
`;
