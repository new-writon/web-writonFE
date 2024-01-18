import { useState } from "react";

import { useRecoilState } from "recoil";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import addBtn from "@/assets/writingPage/icon-add.svg";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  postWritingDataState,
} from "@/recoil/atoms";
import { SpecialQuestionType } from "@/types";

import { TitleSideBox } from "../TitleSideBox";

import { BottomBox, Container } from "./style";

export const AddSpecialQuestionBox = ({ data }: { data: SpecialQuestionType }) => {
  const [fold, setFold] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClickArray, setIsClickArray] = useRecoilState(addSpecialQuestionState);
  const [addSpecialQuestionData, setAddSpecialQuestionData] = useRecoilState(
    addSpecialQuestionArrayState
  );
  const [postWritingData, setpostWritingData] = useRecoilState(postWritingDataState);

  // 스페셜 질문 추가 버튼 함수
  const AddSpecialQuestionFunc = (question_id: number, question: string) => {
    // 스페셜 질문 추가 버튼
    if (!isClickArray.includes(question_id)) {
      // isClickArray에 없을 경우만 추가함.
      setIsClickArray([...isClickArray, question_id]);
      setAddSpecialQuestionData([
        { question_id: question_id, question: question },
        ...addSpecialQuestionData,
      ]);
      setpostWritingData([
        ...postWritingData,
        { question_id: question_id, content: "", visibility: true },
      ]);
    }
  };

  return (
    <Container
      $isHover={isHover}
      $isClick={isClickArray.includes(data?.question_id)}
    >
      <div
        className="topBox"
        onClick={() => setFold(!fold)}
      >
        <div className="text">스페셜 질문</div>
        <img
          src={fold ? topArrow : downArrow}
          alt="V"
        />
      </div>
      <BottomBox
        $isClick={isClickArray.includes(data?.question_id)}
        $fold={fold}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={() => AddSpecialQuestionFunc(data?.question_id, data?.question)}
      >
        <div className="question">{data?.question}</div>
        <div className="etcBox">
          <TitleSideBox type="special">{data?.category}</TitleSideBox>
          <div className="addBtn">
            {isClickArray.includes(data?.question_id) ? (
              <p>추가됨</p>
            ) : (
              <>
                <p>추가하기</p>
                <img
                  src={addBtn}
                  alt="+"
                />
              </>
            )}
          </div>
        </div>
      </BottomBox>
    </Container>
  );
};
