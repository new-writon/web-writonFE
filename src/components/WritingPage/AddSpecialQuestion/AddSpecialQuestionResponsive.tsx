import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import qeustion from "@/assets/mainPage/question.svg";
import { AddSpecialQuestionBox } from "@/components/atom/AddSpecialQuestionBox";
import { AddQuestionButton, KeywordButton } from "@/components/atom/button";
import { getSpecialQuestionState } from "@/recoil/atoms";

import { Container } from "./AddSpecialQuestionResponsive.style";

const AddSpecialQuestionResponsive = () => {
  const [ButtonOn, setButtonOn] = useState<boolean>(false);
  const getSpecialQuestionData = useRecoilValue(getSpecialQuestionState);
  const [uniqueCategory, setUniqueCategory] = useState<string[]>([]);
  const [categoryIdx, setCategoryIdx] = useState<string>("");
  const filteredQuestionsData = getSpecialQuestionData.filter(
    (question) => question.category === categoryIdx
  ); //카테고리 필터

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(getSpecialQuestionData.map((question) => question.category)),
    ]; //카테고리 추출
    setUniqueCategory(uniqueCategories);
    setCategoryIdx(uniqueCategories[0]);
  }, [getSpecialQuestionData]);
  return (
    <Container>
      <div className="questionButton">
        <img
          src={qeustion}
          alt="?"
        />
        <AddQuestionButton
          onClick={() => setButtonOn(!ButtonOn)}
          ButtonOn={ButtonOn}
        >
          질문 추가하기
        </AddQuestionButton>
      </div>
      {ButtonOn && (
        <>
          <div className="keywordBox">
            <div className="keywordTitle">키워드</div>
            <div className="keywordList">
              {uniqueCategory.map((item, idx) => (
                <React.Fragment key={idx}>
                  <KeywordButton
                    onClick={() => setCategoryIdx(item)}
                    select={categoryIdx === item}
                  >
                    {item}
                  </KeywordButton>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="addQuestionBox">
            {filteredQuestionsData?.map((item, idx) => (
              <React.Fragment key={idx}>
                <AddSpecialQuestionBox data={item}></AddSpecialQuestionBox>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default AddSpecialQuestionResponsive;
