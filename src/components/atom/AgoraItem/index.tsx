import { useEffect, useState } from "react";

import { isSameDay } from "date-fns";
import { useRecoilState, useSetRecoilState } from "recoil";

import commentIcon from "@/assets/DetailPage/comment.svg";
import {
  agoraDataState,
  agoraModalBoxState,
  agoraModalState,
  modalBackgroundState,
} from "@/recoil/atoms";
import { agoraDataType } from "@/types";

import { Container, ThrowingContainer } from "./style";

export const AgoraItem = ({ data }: { data: agoraDataType }) => {
  const setAgoraData = useSetRecoilState(agoraDataState);
  const setAgoraModal = useSetRecoilState(agoraModalState);
  const setAgoraModalBox = useSetRecoilState(agoraModalBoxState);

  const spaceAgoraBox = () => {
    setAgoraData(data);

    setAgoraModal(true);
    setTimeout(() => {
      setAgoraModalBox(true);
    }, 10);
    document.body.style.overflowY = "hidden";
  };
  return (
    <Container
      onClick={spaceAgoraBox}
      $type={
        data?.myAgoraSign === "1"
          ? "답변 완료"
          : isSameDay(data?.createdAt, new Date())
            ? "답변 달기"
            : "종료"
      }
    >
      <div className="question">{data?.question}</div>
      <div className="bottom">
        <div className="participant">
          <img
            src={commentIcon}
            alt="C"
          />
          <span className="text">
            <span className="participant-number">{data?.participateCount}</span>명 참여
          </span>
        </div>
        <button className="comment">
          {data?.myAgoraSign === "1"
            ? "답변 완료"
            : isSameDay(data?.createdAt, new Date())
              ? "답변 달기"
              : "종료"}
        </button>
      </div>
    </Container>
  );
};

export const AgoraThrowingTopicItem = ({ type }: { type: string }) => {
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const TodayAgoraWrite = () => {
    document.body.style.overflowY = "hidden";
    setModal({ ...modal, agoraWriteModal: true });
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
    <ThrowingContainer $type={type}>
      {type === "empty" ? (
        <div className="topic-question">
          궁금한 게 있나요?
          <br />
          자유롭게 던져보세요
        </div>
      ) : (
        <div className="topic-question">
          오늘의 스몰톡 주제 {width < 531 && <br />}
          3개가 다 찼어요.
          <br />
          내일 다시 주제를 던져보세요!
        </div>
      )}
      <button
        className="topic-button"
        onClick={TodayAgoraWrite}
      >
        스몰톡 주제 던지기
      </button>
    </ThrowingContainer>
  );
};
