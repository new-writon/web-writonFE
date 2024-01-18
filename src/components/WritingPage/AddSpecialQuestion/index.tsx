import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import qeustion from "@/assets/mainPage/question.svg";
import { AddSpecialQuestionBox } from "@/components/atom/AddSpecialQuestionBox";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { KeywordButton } from "@/components/atom/button";
import { getSpecialQuestionState } from "@/recoil/atoms";

import { Container } from "./style";

export const AddSpecialQuestion = () => {
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
      <div className="top">
        {/*padding때문에 어쩔 수 없음 */}
        <div className="title">
          <MainSemiTitle font={1.125}>질문 추가하기</MainSemiTitle>
          <img
            src={qeustion}
            alt="?"
          />
        </div>
      </div>
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
      <div className="addQuestionBoxTitle">
        <TitleSideBox type="special">적성</TitleSideBox>
        관련 스페셜 질문
      </div>
      <div className="addQuestionBox">
        {filteredQuestionsData?.map((item, idx) => (
          <React.Fragment key={idx}>
            <AddSpecialQuestionBox data={item}></AddSpecialQuestionBox>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
