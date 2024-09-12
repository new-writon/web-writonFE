import { useEffect, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import addBtn from "@/assets/writingPage/icon-add.svg";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  modalBackgroundState,
  modalContentState,
  postEditWritingDataState,
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
  // 원래 따로 파일 만들어야하는데, 그냥 edit데이터와 new데이터 새로 할당
  const [postEditWritingData, setpostEditWritingData] = useRecoilState(postEditWritingDataState);

  const [width, setWidth] = useState<number>(window.innerWidth);

  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const setModalContent = useSetRecoilState(modalContentState);
  // 스페셜 질문 추가 버튼 함수
  const AddSpecialQuestionFunc = (questionId: number, question: string, keword: string) => {
    if (width <= 530 && !isClickArray.includes(questionId)) {
      setModal({ ...modal, contentModal: true });
      setModalContent({ questionId: questionId, question: question, keyword: keword });
      //recoil로 전달
      document.body.style.overflowY = "hidden";
    } else {
      // 스페셜 질문 추가 버튼
      if (!isClickArray.includes(questionId)) {
        // isClickArray에 없을 경우만 추가함.
        setIsClickArray([...isClickArray, questionId]);

        setAddSpecialQuestionData([
          ...addSpecialQuestionData,
          { questionId: questionId, question: question },
        ]);
        setpostWritingData([
          ...postWritingData,
          { questionId: questionId, content: "", visibility: true },
        ]);

        // 원래 따로 파일 만들어야하는데, 그냥 edit데이터와 new데이터 새로 할당
        setpostEditWritingData([
          ...postEditWritingData,
          {
            questionId: questionId,
            content: "",
            visibility: true,
            question: question,
            category: "스페셜 질문",
            userTemplateId: 0,
          },
        ]);
      }
    }
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
    <Container
      $isHover={isHover}
      $isClick={isClickArray.includes(data?.questionId)} //모달창 뛰우기
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
        $isClick={isClickArray.includes(data?.questionId)}
        $fold={fold}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={() => AddSpecialQuestionFunc(data?.questionId, data?.question, data?.keyword)}
      >
        <div className="question">{data?.question}</div>
        <div className="etcBox">
          <TitleSideBox type="special">{data?.keyword}</TitleSideBox>
          <div className="addBtn">
            {isClickArray.includes(data?.questionId) ? (
              <span>추가됨</span>
            ) : (
              <>
                <span>추가하기</span>
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
