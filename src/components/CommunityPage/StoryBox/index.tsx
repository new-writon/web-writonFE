import React, { useCallback, useRef } from "react";

import Slider from "react-slick";
import styled from "styled-components";

import arrow from "@/assets/communityPage/storyArrow.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { StoryItem } from "@/components/atom/StoryItem";
import { ArrowButton, StoryItemBox } from "@/components/atom/StoryItem/style";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { stroyDummy } from "@/dummy/story";
import { Inner } from "@/style/global";

import { Container } from "./style";

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
    speed: 1200,
    arrows: false,
  };
  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);

  return (
    <Inner>
      <Container>
        <div className="title">
          <MainSemiTitle font={1.25}>
            지금 <div className="number">{99}</div>명이 함께 {"렛츠인턴 2월 TIL 챌린지"} 도전중!
          </MainSemiTitle>
          <TitleSideBox>D-{15}</TitleSideBox>
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
