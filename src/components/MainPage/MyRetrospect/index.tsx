import React, { useCallback, useEffect, useRef, useState } from "react";

// eslint-disable-next-line import/order
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import arrow from "@/assets/mainPage/icon-arrow.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { RetrospectItem } from "@/components/atom/RetrospectItem";
import { Inner } from "@/style/global";
import { communityContentProps } from "@/types";

import { NoRetrospect } from "../NoRetrospect";

import { ArrowButton, Container, RetroSpectBox, RetroSpectBoxResponsive } from "./style";

export const MyRetrospect = ({ RetrospectData }: { RetrospectData: communityContentProps[][] }) => {
  const slickRef = useRef<Slider | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const REACT_SLIDER_SETTINGS = {
    infinite: true,
    slidesToShow: RetrospectData?.length > 2 ? 3 : RetrospectData?.length > 1 ? 2 : 1,
    slidesToScroll: 3,
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
          slidesToShow: RetrospectData?.length === 1 ? 1 : 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);

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
        <div className="RetrospectTitle">
          <MainSemiTitle font={1.25}>나의 회고 모아보기</MainSemiTitle>
          <div className="quantity">{RetrospectData?.length}개</div>
        </div>
        {RetrospectData?.length > 0 ? (
          <>
            <RetroSpectBox>
              <StyledSlider
                {...REACT_SLIDER_SETTINGS}
                ref={slickRef}
              >
                {RetrospectData.map((data, idx) => (
                  <React.Fragment key={idx}>
                    <RetrospectItem data={data} />
                  </React.Fragment>
                ))}
              </StyledSlider>
              {RetrospectData?.length > 3 || (width < 631 && RetrospectData?.length === 2) ? (
                <>
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
                </>
              ) : (
                ""
              )}
            </RetroSpectBox>
            <RetroSpectBoxResponsive>
              {RetrospectData.map((data, idx) => (
                <React.Fragment key={idx}>
                  <RetrospectItem data={data} />
                </React.Fragment>
              ))}
            </RetroSpectBoxResponsive>
          </>
        ) : (
          <NoRetrospect type="my" />
        )}
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
