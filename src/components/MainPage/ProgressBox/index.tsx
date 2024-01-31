import { useEffect, useState } from "react";

import { CountingLabelCard } from "@/components/atom/CountingLabelCard";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { ProgressBar } from "@/components/atom/ProgressBar";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { Inner } from "@/style/global";
import { ChallengeCurrentType } from "@/types";

import { Container, CountingLabelContainer } from "./style";

export const ProgressBox = ({
  ChallengeCurrent,
}: {
  ChallengeCurrent: ChallengeCurrentType | undefined;
}) => {
  const [value, setValue] = useState<number>(0);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);
  useEffect(() => {
    const count = ChallengeCurrent?.challengeSuccessCount || 0;
    const percentage = ChallengeCurrent?.challengeOverlapCount || 20;
    setTimeout(() => {
      setValue(0); // 가중치 넣기 , 1이 아무것도 안했을 때 value 나중에 날짜에 가중치 *5씩하기
      setTimeout(() => {
        setValue(count === 0 ? 1 : count * (100 / percentage));
      }, 100);
    }, 500);
  }, [ChallengeCurrent?.challengeOverlapCount, ChallengeCurrent?.challengeSuccessCount]);
  return (
    <>
      <Inner>
        <Container>
          <div className="title">
            <MainSemiTitle font={1.25}>
              {ChallengeCurrent?.nickname || "00"}님의 {ChallengeCurrent?.organization}{" "}
              {ChallengeCurrent?.challenge} 챌린지
            </MainSemiTitle>
            <TitleSideBox type="default">D-{ChallengeCurrent?.overlapPeriod || "15"}</TitleSideBox>
          </div>
          <ProgressBar
            value={value} // 퍼센티지 받기 && 날짜만 받아서 가중치 곱해도 될듯
            startDate={ChallengeCurrent?.challengeSuccessCount} //날짜 받기
            endDate={ChallengeCurrent?.challengeOverlapCount}
          />
          <div className="webCountingLabelBox">
            <CountingLabelContainer>
              <CountingLabelCard
                title={"작성된 회고"}
                currentContent={`${ChallengeCurrent?.challengeSuccessCount}일`}
                defaultContent={`${ChallengeCurrent?.challengeOverlapCount}일`}
              />
              <CountingLabelCard
                title={"환급 가능 보증금"}
                currentContent={`${ChallengeCurrent?.overlapDeposit.toLocaleString()}원`}
                defaultContent={`${ChallengeCurrent?.challengeDeposit.toLocaleString()}원`}
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
          </div>
        </Container>
      </Inner>
      <Inner>
        <div className="mobileCountingLabelBox">
          <CountingLabelContainer>
            <CountingLabelCard
              title={"작성된 회고"}
              currentContent={`${ChallengeCurrent?.challengeSuccessCount}일`}
              defaultContent={`${ChallengeCurrent?.challengeOverlapCount}일`}
            />
            <CountingLabelCard
              title={"환급 가능 보증금"}
              currentContent={`${ChallengeCurrent?.overlapDeposit.toLocaleString()}원`}
              defaultContent={`${ChallengeCurrent?.challengeDeposit.toLocaleString()}원`}
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
        </div>
      </Inner>
    </>
  );
};
