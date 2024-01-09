import { useEffect, useState } from "react";

import { CountingLabelCard } from "@/components/atom/CountingLabelCard";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { ProgressBar } from "@/components/atom/ProgressBar";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { Inner } from "@/style/global";

import { Container, CountingLabelContainer } from "./style";
const price = 25000;
export const ProgressBox = () => {
  const [value, setValue] = useState<number>(0);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setValue(0); // 가중치 넣기 , 1이 아무것도 안했을 때 value 나중에 날짜에 가중치 *5씩하기
      setTimeout(() => {
        setValue(1);
      }, 300);
    }, 700);
  }, []);
  return (
    <Inner>
      <Container>
        <div className="title">
          <MainSemiTitle font={1.25}>지호님의 렛츠인턴 1월 TIL 챌린지</MainSemiTitle>
          <TitleSideBox>D-{15}</TitleSideBox>
        </div>
        <ProgressBar
          value={value} // 퍼센티지 받기 && 날짜만 받아서 가중치 곱해도 될듯
          date={15} //날짜 받기
        />
        <CountingLabelContainer>
          <CountingLabelCard
            title={"작성된 회고"}
            currentContent={`${15}일`}
            defaultContent={"20일"}
          />
          <CountingLabelCard
            title={"환급 가능 보증금"}
            currentContent={`${price.toLocaleString()}원`}
            defaultContent={"25,000원"}
          />
          {/* <div className="priceMessage">
            회고 {20 - 15}일 더 작성하면, 보증급 전액 환급 가능해요.
          </div> */}
          <div className="priceCondition">
            <TooltipButton
              tooltipOn={tooltipOn}
              onClick={() => setTooltopOn(!tooltipOn)}
            >
              환급 조건
            </TooltipButton>
          </div>
        </CountingLabelContainer>
      </Container>
    </Inner>
  );
};
