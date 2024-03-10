import React from "react";

import { QuestionEditBox } from "@/components/atom/QuestionEditBox";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { postEditWritingDataType } from "@/types";

import { Container } from "./style";

export const BasicEditQuestion = ({
  postEditWritingData,
}: {
  postEditWritingData: postEditWritingDataType[];
}) => {
  return (
    <Container>
      <div className="category">
        <TitleSideBox type="special">베이직 질문</TitleSideBox>
      </div>
      <div className="basicBox">
        {postEditWritingData
          .filter((obj) => obj.category === "베이직 질문")
          .map((item, idx) => (
            <React.Fragment key={idx}>
              <QuestionEditBox
                data={item}
                idx={idx}
              />
            </React.Fragment>
          ))}
      </div>
    </Container>
  );
};
