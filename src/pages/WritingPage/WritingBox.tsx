import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { postwritingSubmit } from "@/apis/WritingPage";
import { AddSpecialQuestion } from "@/components/WritingPage/AddSpecialQuestion";
import { BasicQuestion } from "@/components/WritingPage/BasicQuestion";
import { SpecialQuestion } from "@/components/WritingPage/SpecialQuestion";
import { WritingSubmitButton } from "@/components/atom/button";
import { addSpecialQuestionArrayState, postWritingDataState } from "@/recoil/atoms";
import { Inner } from "@/style/global";

export const WritingBox = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const addSpecialQuestionData = useRecoilValue(addSpecialQuestionArrayState);
  const postWritingData = useRecoilValue(postWritingDataState);
  useEffect(() => {
    console.log(postWritingData);
  }, [postWritingData]);
  const submitWrite = async () => {
    const response = await postwritingSubmit(
      localStorage.getItem("organization") || "",
      localStorage.getItem("challengeId") || "1",
      date || "",
      postWritingData
    );
    console.log(response);
    navigate("/");
  };
  return (
    <Inner>
      <Container>
        <div className="left">
          {addSpecialQuestionData?.map((item, idx) => (
            <React.Fragment key={idx}>
              <SpecialQuestion
                data={item}
                idx={idx}
              />
            </React.Fragment>
          ))}
          <BasicQuestion />
        </div>
        <div className="right">
          <WritingSubmitButton
            onClick={submitWrite}
            disabled={postWritingData?.every((item) => item.content.trim() !== "")}
          >
            작성 완료
          </WritingSubmitButton>
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
`;
