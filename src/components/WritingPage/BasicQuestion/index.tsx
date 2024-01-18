import React from "react";

import { useRecoilValue } from "recoil";

import { QuestionBox } from "@/components/atom/QuestionBox";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { getBasicQuestionState } from "@/recoil/atoms";

import { Container } from "./style";

export const BasicQuestion = () => {
  const getBasicQuestionData = useRecoilValue(getBasicQuestionState);

  return (
    <Container>
      <div className="category">
        <TitleSideBox type="special">베이직 질문</TitleSideBox>
      </div>
      <div className="basicBox">
        {getBasicQuestionData.map((item, idx) => (
          <React.Fragment key={idx}>
            <QuestionBox
              data={item}
              idx={idx}
            />
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
