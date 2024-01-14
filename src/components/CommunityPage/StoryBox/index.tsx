import React, { useCallback, useRef } from "react";

import Slider from "react-slick";
import styled from "styled-components";

import arrow from "@/assets/communityPage/storyArrow.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { StoryItem } from "@/components/atom/StoryItem";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { stroyDummy } from "@/dummy/story";
import { Inner } from "@/style/global";

import { Container, ArrowButton, StoryItemBox, StoryItemBoxResponsive } from "./style";

const my = {
  name: "호연초이",
  message: "ㄷㄹㅈㄷㄹㄷㅈㄹㄷㅈㄹㄷㅈㄹ",
  profile: "ㅋㅋ",
  job: "서비스 기획",
  company: "카카오",
  oneline: "카카오 메일의 서비스 기획 파트에서 어쩌구저쩌구 이러저러한 왁자지껄 일을 합니다 :)",
};

export const StoryBox = () => {
  const slickRef = useRef<Slider | null>(null);
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

  return (
    <Inner>
      <Container>
        <div className="title first">
          <MainSemiTitle font={1.25}>
            <p>
              지금 <div className="number">{99}</div>명이 함께
            </p>
            {"렛츠인턴 2월 TIL 챌린지"} 도전중!
          </MainSemiTitle>
          <TitleSideBox type="default">D-{15}</TitleSideBox>
        </div>
        <StoryItemBox>
          <StyledSlider
            {...REACT_SLIDER_SETTINGS}
            ref={slickRef}
          >
            <StoryItem
              data={my}
              someone={"me"}
            />
            {stroyDummy.map((data, idx) => (
              <React.Fragment key={idx}>
                <StoryItem
                  data={data}
                  someone={"other"}
                />
              </React.Fragment>
            ))}
          </StyledSlider>
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

        <StoryItemBoxResponsive>
          <StoryItem
            data={my}
            someone={"me"}
          />
          {stroyDummy.map((data, idx) => (
            <React.Fragment key={idx}>
              <StoryItem
                data={data}
                someone={"other"}
              />
            </React.Fragment>
          ))}
        </StoryItemBoxResponsive>
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
  }
`;
