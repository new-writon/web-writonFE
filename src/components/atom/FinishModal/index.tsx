/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { getFinishModalData, putFinishModal } from "@/apis/FinishModal";
import finishFirst from "@/assets/finishModal/finishFirst.svg";
import finishSecond from "@/assets/finishModal/finishSecond.svg";
import arrow from "@/assets/finishModal/leftArrow.svg";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { finishModalState } from "@/recoil/atoms";
import { finishModalType } from "@/types";

import { FinishModalButton } from "../button";

import { Container } from "./style";

export const FinishModal = () => {
  const [step, setStep] = useState<string>("");
  const [modalData, setModalData] = useState<finishModalType>();
  const setFinishModal = useSetRecoilState(finishModalState);
  const executeAsyncTask = useAsyncWithLoading();

  const reviewForm = async (reviewUrl: string | null | undefined) => {
    try {
      const response = await putFinishModal(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1"
      );
      console.log(response);
      window.open(reviewUrl || "http://www.writon.co.kr");
      setFinishModal(false);
      document.body.style.overflowY = "scroll";
    } catch {
      throw new Error("shit");
    }
  };

  const FinishModalRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const data = await getFinishModalData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1"
        );
        setModalData(data);
      } catch {
        throw new Error("shit");
      }
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    FinishModalRendering();
  }, []);

  return (
    <Container>
      <div className="finishWrapper">
        <div className={`${step === "next" && "next"} finishBox front`}>
          <div className="challengeName">
            {modalData?.organization} {modalData?.challenge} 챌린지
          </div>
          <div className="title">챌린지가 종료되었어요 🎉</div>
          <img
            src={finishFirst}
            alt="finish"
          />
          <div className="text first">
            챌린지 기간 {modalData?.challengeOverlapCount}일 중{" "}
            <div className="purple">{modalData?.challengeSuccessCount}일</div> 작성에 성공했어요.
            <br /> 환급 조건에 따라{" "}
            <div className="purple">
              {(modalData?.challengeDeposit || 25000) - (modalData?.overlapDeposit || 0)}원
            </div>
            의 보증금이 차감되어,
            <br />
            <div className="purple">{modalData?.overlapDeposit}원</div>의 보증금을 환급받을 수
            있어요.
          </div>
          <div className="etcText">
            가입 시 입력하신 계좌로 3일 안에 보증금이 입금될 예정이에요.
            <br />
            관련 문의는 채널톡을 이용해주세요.
          </div>
          <FinishModalButton
            onClick={() => setStep("next")}
            type="next"
          >
            다음
          </FinishModalButton>
        </div>
        <div className={`${step === "next" && "next"} finishBox back`}>
          <div className="topBtns">
            <div
              className="previous"
              onClick={() => setStep("")}
            >
              <img
                src={arrow}
                alt="<"
              />
              이전
            </div>
            <div
              className="close"
              onClick={() => setFinishModal(false)}
            >
              닫기
            </div>
          </div>
          <div className="title second">
            챌린지 어떠셨나요?
            <br />
            다음달도 함께 회고하러가요
          </div>
          <img
            src={finishSecond}
            alt="finish"
          />
          <div className="texts">
            <div className="text">
              지금 바로 다음 달 챌린지를 신청할 수 있어요!
              {/* <div className="highlight">챌린지 만족도 조사</div>는 구글 폼으로 진행되며,
              <br />
              예상 소요 시간은 <div className="purple">5분</div>이에요. */}
            </div>
            <div className="text">
              객관식 두 문항으로 구성된 <br /> 챌린지 만족도 조사도 함께 진행되며,
              <br /> 예상 소요시간은 <div className="purple">30초</div>에요.
              {/* 라이톤에서 성실하게 챌린지에 참여해주신
              <br />
              {modalData?.nickname}님의 소중한 의견을 반영해
              <br />더 나은 라이톤 서비스를 만들어 갈게요. */}
            </div>
          </div>
          <FinishModalButton
            onClick={() => reviewForm(modalData?.reviewUrl)}
            type="finish"
          >
            다음 달 회고 챌린지 신청하기
          </FinishModalButton>
        </div>
      </div>
    </Container>
  );
};
