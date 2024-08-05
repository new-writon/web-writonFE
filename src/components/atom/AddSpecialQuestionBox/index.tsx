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
  const AddSpecialQuestionFunc = (question_id: number, question: string, category: string) => {
    if (width <= 530 && !isClickArray.includes(question_id)) {
      setModal({ ...modal, contentModal: true });
      setModalContent({ question_id: question_id, question: question, category: category });
      //recoil로 전달
      document.body.style.overflowY = "hidden";
    } else {
      // 스페셜 질문 추가 버튼
      if (!isClickArray.includes(question_id)) {
        // isClickArray에 없을 경우만 추가함.
        setIsClickArray([...isClickArray, question_id]);

        setAddSpecialQuestionData([
          ...addSpecialQuestionData,
          { question_id: question_id, question: question },
        ]);
        setpostWritingData([
          ...postWritingData,
          { question_id: question_id, content: "", visibility: true },
        ]);

        // 원래 따로 파일 만들어야하는데, 그냥 edit데이터와 new데이터 새로 할당
        setpostEditWritingData([
          ...postEditWritingData,
          {
            question_id: question_id,
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
      $isClick={isClickArray.includes(data?.question_id)} //모달창 뛰우기
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
        onClick={() => AddSpecialQuestionFunc(data?.question_id, data?.question, data?.category)}
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
