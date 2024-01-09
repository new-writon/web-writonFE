import { useEffect, useState } from "react";

import { AnimatedLineProgressBar } from "@frogress/line";

import flag from "@/assets/mainPage/icon-flag.svg";

import { Container } from "./style";

interface ProgressBarProps {
  value: number;
  date: number;
}

export const ProgressBar = ({ value, date }: ProgressBarProps) => {
  const [width, setWidth] = useState<number>(
    window.innerWidth >= 1140 ? 1080 : window.innerWidth - 60
  );
  const handleResize = () => {
    //뷰크기 강제로 강져오기
    if (window.innerWidth >= 1140) {
      setWidth(1080);
    } else {
      setWidth(window.innerWidth - 60); //inner padding값
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  return (
    <Container $value={value}>
      {value > 0 && (
        <>
          <div className="round"></div>
          <div className="message">
            {value === 1 ? (
              <p>첫 회고를 작성해 주세요! 🔥</p>
            ) : (
              <p>{date}일 회고 성공! 대단해요 🔥</p>
            )}
            <div className="arrow"></div>
          </div>
          <div className="date">
            {date}일<p>/20일</p>
          </div>
        </>
      )}
      <div className="endDate">20일</div>
      <img
        src={flag}
        alt="깃발"
        className="flag"
      />
      <AnimatedLineProgressBar
        percent={value}
        rounded={11}
        height={11}
        width={width - 50} //60 + 50
        transition={{ easing: "easeInOut" }}
        progressColor="linear-gradient(90deg, #D5ABFF 0%, #6A63F5 100%)"
      />
    </Container>
  );
};
