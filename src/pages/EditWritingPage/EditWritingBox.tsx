import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { AddSpecialQuestion } from "@/components/WritingPage/AddSpecialQuestion";
import AddSpecialQuestionResponsive from "@/components/WritingPage/AddSpecialQuestion/AddSpecialQuestionResponsive";
import { BasicEditQuestion } from "@/components/WritingPage/BasicEditQuestion";
import { SpecialEditQuestion } from "@/components/WritingPage/SpecialEditQuestion";
import { CompletePopup } from "@/components/atom/WritingPopup/CompletePopup";
import { WritingSubmitButton } from "@/components/atom/button";
import {
  DateResponsiveState,
  DetailDataState,
  modalBackgroundState,
  postEditWritingDataState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { useSubmitEditWrite } from "@/hooks/reactQueryHooks/useMainHooks";

export const EditWritingBox = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [popUpOn, setpopUpOn] = useState<boolean>(false);
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const setDateResponsive = useSetRecoilState(DateResponsiveState);
  const postEditWritingData = useRecoilValue(postEditWritingDataState);
  const detailData = useRecoilValue(DetailDataState);

  const completeBtn = (type: string) => {
    if (postEditWritingData?.every((item) => item.content.trim() !== "")) {
      if (type === "mobile") {
        setModal({ ...modal, completeEditModal: true });
        document.body.style.overflowY = "hidden";
      } else if (type === "web") {
        setpopUpOn(true);
      }
    }
  };

  useEffect(() => {
    setDateResponsive(date);
  }, [date, detailData, postEditWritingData, setDateResponsive]);

  const { mutate: submitEditWrite } = useSubmitEditWrite();

  const handleSubmit = () => {
    submitEditWrite({
      organization: localStorage.getItem("organization") as string,
      challengeId: localStorage.getItem("challengeId") as string,
      postEditWritingData: postEditWritingData,
    });
    navigate("/");
  };
  return (
    <Inner>
      <Container>
        <AddSpecialQuestionResponsive />
        <div className="writingBox left">
          {postEditWritingData
            .filter((obj) => obj.category === "스페셜 질문")
            ?.map((item, idx) => (
              <React.Fragment key={idx}>
                <SpecialEditQuestion
                  data={item}
                  idx={idx}
                />
              </React.Fragment>
            ))}
          <BasicEditQuestion postEditWritingData={postEditWritingData} />
          <div className="submitBtnResponsive">
            <WritingSubmitButton
              onClick={() => completeBtn("mobile")}
              disabled={postEditWritingData?.every((item) => item.content.trim() !== "")}
            >
              수정 완료
            </WritingSubmitButton>
          </div>
        </div>
        <div className="writingBox right">
          <WritingSubmitButton
            onClick={() => completeBtn("web")}
            disabled={postEditWritingData?.every((item) => item.content.trim() !== "")}
          >
            수정 완료
          </WritingSubmitButton>
          {popUpOn && (
            <CompletePopup
              onClick={handleSubmit}
              setpopUpOn={setpopUpOn}
            />
          )}
          <AddSpecialQuestion />
        </div>
      </Container>
    </Inner>
  );
};

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  gap: 20px;
  .left {
    width: 69%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .right {
    width: 31%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .submitBtnResponsive {
    display: none;
    padding: 54px 16px 180px;
    background-color: var(--White);
  }

  @media (max-width: 530px) {
    display: block;
    margin-top: 0;
    width: 100vw;
    .left {
      width: 100%;
      gap: 0;
    }
    .right {
      display: none;
    }
    .submitBtnResponsive {
      display: block;
    }
  }
`;
