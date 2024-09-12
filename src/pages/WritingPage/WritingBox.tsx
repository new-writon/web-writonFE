import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { AddSpecialQuestion } from "@/components/WritingPage/AddSpecialQuestion";
import AddSpecialQuestionResponsive from "@/components/WritingPage/AddSpecialQuestion/AddSpecialQuestionResponsive";
import { BasicQuestion } from "@/components/WritingPage/BasicQuestion";
import { SpecialQuestion } from "@/components/WritingPage/SpecialQuestion";
import { CompletePopup } from "@/components/atom/WritingPopup/CompletePopup";
import { WritingSubmitButton } from "@/components/atom/button";
import {
  DateResponsiveState,
  addSpecialQuestionArrayState,
  modalBackgroundState,
  postWritingDataState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { useSubmitWrite } from "@/hooks/reactQueryHooks/useMainHooks";

export const WritingBox = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [popUpOn, setpopUpOn] = useState<boolean>(false);
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const setDateResponsive = useSetRecoilState(DateResponsiveState);
  const addSpecialQuestionData = useRecoilValue(addSpecialQuestionArrayState);
  const postWritingData = useRecoilValue(postWritingDataState);

  const completeBtn = (type: string) => {
    if (postWritingData?.every((item) => item.content.trim() !== "")) {
      if (type === "mobile") {
        setModal({ ...modal, completeModal: true });
        document.body.style.overflowY = "hidden";
      } else if (type === "web") {
        setpopUpOn(true);
      }
    }
  };

  useEffect(() => {
    setDateResponsive(date);
  }, [date, postWritingData, setDateResponsive, addSpecialQuestionData]);

  const { mutate: submitWrite } = useSubmitWrite();

  const handleSubmit = () => {
    submitWrite({
      organization: localStorage.getItem("organization") as string,
      challengeId: localStorage.getItem("challengeId") as string,
      date: date || "",
      postWritingData,
    });
    navigate("/");
  };

  return (
    <Inner>
      <Container>
        <AddSpecialQuestionResponsive />
        <div className="writingBox left">
          {addSpecialQuestionData?.map((item, idx) => (
            <React.Fragment key={idx}>
              <SpecialQuestion
                data={item}
                idx={idx}
              />
            </React.Fragment>
          ))}
          <BasicQuestion />
          <div className="submitBtnResponsive">
            <WritingSubmitButton
              onClick={() => completeBtn("mobile")}
              disabled={postWritingData?.every((item) => item.content.trim() !== "")}
            >
              작성 완료
            </WritingSubmitButton>
          </div>
        </div>
        <div className="writingBox right">
          <WritingSubmitButton
            onClick={() => completeBtn("web")}
            disabled={postWritingData?.every((item) => item.content.trim() !== "")}
          >
            작성 완료
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
