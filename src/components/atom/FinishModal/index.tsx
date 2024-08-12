/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useSetRecoilState } from "recoil";

import {
  getFinishModalData,
  getReEngagementData,
  getSatisfactionData,
  patchReEngagementData,
  postSatisfactionObjectiveData,
  putFinishModal,
} from "@/apis/FinishModal";
import finishFirst from "@/assets/finishModal/finishFirst.svg";
import finishSecond from "@/assets/finishModal/finishSecond.svg";
import arrow from "@/assets/finishModal/leftArrow.svg";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { finishModalState } from "@/recoil/atoms";
import { finishModalType, satisfactionQuestionType } from "@/types";

import { FinishModalButton } from "../button";

import { Container } from "./style";

export const FinishModal = () => {
  const [step, setStep] = useState<string>("");
  const [satisfactionQuestion, setSatisfactionQuestion] = useState<satisfactionQuestionType[]>();
  const [modalData, setModalData] = useState<finishModalType>();
  const [reEngagement, setReEngagement] = useState<number>(0);
  const [reEngagementCheck, setReEngagementCheck] = useState<{ hoverItem: number; score: number }>({
    hoverItem: 2,
    score: 2,
  });
  const setFinishModal = useSetRecoilState(finishModalState);
  const executeAsyncTask = useAsyncWithLoading();

  const reviewForm = async () => {
    const simplifiedData = satisfactionQuestion?.map(({ satisfaction_id, score }) => ({
      satisfactionId: satisfaction_id,
      score,
    }));
    if (simplifiedData?.some((item) => item.score === 0) || reEngagementCheck.score === 2) {
      alert("설문조사를 다 해주세요!");
      return;
    }
    try {
      await Promise.all([
        postSatisfactionObjectiveData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          simplifiedData
        ),
        patchReEngagementData(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          reEngagementCheck.score === 1 ? true : false
        ),
      ]);

      await putFinishModal(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1"
      );
      // window.open(reviewUrl || "http://www.writon.co.kr");
      setFinishModal(false);
      document.body.style.overflowY = "scroll";
    } catch {
      throw new Error("shit");
    }
  };

  const FinishModalRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const data = await Promise.all([
          getFinishModalData(
            localStorage.getItem("organization") as string,
            localStorage.getItem("challengeId") as string
          ),
          getSatisfactionData(localStorage.getItem("challengeId") as string),
          getReEngagementData(localStorage.getItem("challengeId") as string),
        ]);
        setModalData(data[0]);
        const updatedSatisfaction = data[1]
          .filter((item) => item.type === "객관식")
          .map((item) => ({
            ...item,
            hoverItem: 0,
            score: 0,
          }));
        setSatisfactionQuestion(updatedSatisfaction);
        setReEngagement(data[2].restart);
      } catch {
        throw new Error("shit");
      }
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    FinishModalRendering();
  }, []);

  // const FinishModalRendering = useCallback(async () => {
  //   try {
  //     const data = await getFinishModalData(organization, challengeId);
  //     setModalData(data);
  //   } catch {
  //     throw new Error("shit");
  //   }
  // }, [organization, challengeId]);

  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  //   FinishModalRendering();
  // }, [FinishModalRendering]);

  return (
    <Container>
      <div className="finishWrapper">
        <div className={`${step} finishBox first-page`}>
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
        <div className={`${step} finishBox second-page`}>
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
            <div className="text">지금 바로 다음 달 챌린지를 신청할 수 있어요!</div>
            <div className="text">
              객관식 두 문항으로 구성된 <br /> 챌린지 만족도 조사도 함께 진행되며,
              <br /> 예상 소요시간은 <div className="purple">30초</div>에요.
            </div>
          </div>
          <FinishModalButton
            onClick={() => setStep("end")}
            type="finish"
          >
            다음 달 회고 챌린지 신청하기
          </FinishModalButton>
        </div>
        <div className={`${step} finishBox third-page`}>
          <div className="topBtns">
            <div
              className="previous"
              onClick={() => setStep("next")}
            >
              <img
                src={arrow}
                alt="<"
              />
              이전
            </div>
            <div
              className="close"
              onClick={() => {
                setFinishModal(false);
                document.body.style.overflowY = "scroll";
              }}
            >
              닫기
            </div>
          </div>
          <div className="question-box">
            {satisfactionQuestion?.map((satisfaction, idx) => (
              <div className="choice-question">
                <span className="question-title">
                  {idx + 1}. {satisfaction.question}
                </span>
                <form className="form">
                  <span>매우 불만족</span>
                  <div className="radio-buttons">
                    {[1, 2, 3, 4, 5].map((item, idx) => (
                      <div
                        className="radio-button"
                        key={idx + 1}
                      >
                        <span>{item}</span>
                        <div className="circle-box">
                          <div
                            className={
                              satisfaction.score === item
                                ? ""
                                : satisfaction.hoverItem === item
                                  ? "circle-wrapper"
                                  : ""
                            }
                          ></div>
                          <div
                            onMouseOver={() => {
                              const updatedSatisfactionQuestion = satisfactionQuestion.map((s) =>
                                s === satisfaction ? { ...s, hoverItem: item } : s
                              );
                              setSatisfactionQuestion(updatedSatisfactionQuestion);
                            }}
                            onMouseOut={() => {
                              const updatedSatisfactionQuestion = satisfactionQuestion.map((s) =>
                                s === satisfaction ? { ...s, hoverItem: 0 } : s
                              );
                              setSatisfactionQuestion(updatedSatisfactionQuestion);
                            }}
                            onClick={() => {
                              const updatedSatisfactionQuestion = satisfactionQuestion.map((s) =>
                                s === satisfaction ? { ...s, score: item } : s
                              );
                              setSatisfactionQuestion(updatedSatisfactionQuestion);
                            }}
                            className={`circle ${satisfaction.score === item && "active"}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span>매우 만족</span>
                </form>
              </div>
            ))}
            {reEngagement !== 0 && (
              <div className="YesOrNo-question">
                <span className="question-title">
                  3. {Number(modalData?.challenge.match(/\d+/)?.[0] || format(new Date(), "M")) + 1}
                  월 TIL 챌린지 참여 신청
                </span>
                <form className="form">
                  <div className="radio-buttons">
                    <div className="radio-button">
                      <div className="circle-box">
                        <div
                          className={
                            reEngagementCheck.score === 1
                              ? ""
                              : reEngagementCheck.hoverItem === 1
                                ? "circle-wrapper"
                                : ""
                          }
                        ></div>
                        <div
                          onMouseOver={() => {
                            setReEngagementCheck({ ...reEngagementCheck, hoverItem: 1 });
                          }}
                          onMouseOut={() => {
                            setReEngagementCheck({ ...reEngagementCheck, hoverItem: 2 });
                          }}
                          onClick={() => setReEngagementCheck({ ...reEngagementCheck, score: 1 })}
                          className={`circle ${reEngagementCheck.score === 1 && "active"}`}
                        ></div>
                      </div>
                      <span>예, 신청합니다</span>
                    </div>
                    <div className="radio-button">
                      <div className="circle-box">
                        <div
                          className={
                            reEngagementCheck.score === 0
                              ? ""
                              : reEngagementCheck.hoverItem === 0
                                ? "circle-wrapper"
                                : ""
                          }
                        ></div>
                        <div
                          onMouseOver={() => {
                            setReEngagementCheck({ ...reEngagementCheck, hoverItem: 0 });
                          }}
                          onMouseOut={() => {
                            setReEngagementCheck({ ...reEngagementCheck, hoverItem: 2 });
                          }}
                          onClick={() => setReEngagementCheck({ ...reEngagementCheck, score: 0 })}
                          className={`circle ${reEngagementCheck.score === 0 && "active"}`}
                        ></div>
                      </div>
                      <span>아니오</span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          <FinishModalButton
            onClick={reviewForm}
            type="end"
          >
            제출하기
          </FinishModalButton>
        </div>
      </div>
    </Container>
  );
};
