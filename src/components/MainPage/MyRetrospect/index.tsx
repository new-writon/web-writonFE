import React, { useCallback, useRef } from "react";

// eslint-disable-next-line import/order
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import arrow from "@/assets/mainPage/icon-arrow.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { RetrospectItem } from "@/components/atom/RetrospectItem";
import { previewRetrospec } from "@/dummy/previewRetrospect";
import { Inner } from "@/style/global";

import { ArrowButton, Container, RetroSpectBox, RetroSpectBoxResponsive } from "./style";

export const MyRetrospect = () => {
  const slickRef = useRef<Slider | null>(null);
  const REACT_SLIDER_SETTINGS = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1200,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 405,
        settings: {
          slidesToShow: 1.75,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1.95,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
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
        <div className="RetrospectTitle">
          <MainSemiTitle font={1.25}>나의 회고 모아보기</MainSemiTitle>
          <div className="quantity">4개</div>
        </div>
        <RetroSpectBox>
          <StyledSlider
            {...REACT_SLIDER_SETTINGS}
            ref={slickRef}
          >
            {previewRetrospec.map((data, idx) => (
              <React.Fragment key={idx}>
                <RetrospectItem data={data} />
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
        </RetroSpectBox>
        <RetroSpectBoxResponsive>
          {previewRetrospec.map((data, idx) => (
            <React.Fragment key={idx}>
              <RetrospectItem data={data} />
            </React.Fragment>
          ))}
        </RetroSpectBoxResponsive>
      </Container>
    </Inner>
  );
};
const StyledSlider = styled(Slider)`
  width: 100%;

  margin: 0 auto;
  .slick-track {
    display: flex;
    gap: 18px;
    padding: 20px 0 30px;
  }
  .slick-dots li {
    margin: 0;
  }
  .slick-dots {
    bottom: -15px;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before {
    color: var(--purple-50, #6a63f5) !important;
  }
  .slick-dots li button:before {
    font-size: 11px !important;
  }
  .slick-dots li.slick-active button:before {
    color: var(--purple-50, #6a63f5) !important;
    opacity: 1 !important;
  }

  @media (max-width: 530px) {
    .slick-track {
      gap: 11px;
    }
    .slick-dots {
      display: none !important;
    }
  }
`;
