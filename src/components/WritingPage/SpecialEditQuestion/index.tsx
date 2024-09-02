import { useEffect, useRef, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import close from "@/assets/mainPage/close.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { DeletePopup } from "@/components/atom/WritingPopup/DeletePopup";
import { PublicButton } from "@/components/atom/button";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  deleteQuestionIdState,
  modalBackgroundState,
  postEditWritingDataState,
} from "@/recoil/atoms";
import { postEditWritingDataType } from "@/types";

import { Container } from "./style";

export const SpecialEditQuestion = ({
  data,
  idx,
}: {
  data: postEditWritingDataType;
  idx: number;
}) => {
  const [isClickArray, setIsClickArray] = useRecoilState(addSpecialQuestionState); //사이드 바에 있는 추가한 거 지우기 recoil
  const [addSpecialQuestionData, setAddSpecialQuestionData] = useRecoilState(
    addSpecialQuestionArrayState
  );
  const [postEditWritingData, setpostEditWritingData] = useRecoilState(postEditWritingDataState);

  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(data.visibility);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(data.content);
  const [popUpOn, setpopUpOn] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const setDeleteQuestionId = useSetRecoilState(deleteQuestionIdState);

  const onVisibility = (questionId: number) => {
    setToggleSwitchOn(!toggleSwitchOn);
    setpostEditWritingData(
      //questionid 가 같은 곳에 visbility 집아넣는다.
      postEditWritingData?.map((item) =>
        item.questionId === questionId ? { ...item, visibility: !toggleSwitchOn } : item
      )
    );
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, questionId: number) => {
    setText(e.currentTarget.value);
    setpostEditWritingData(
      postEditWritingData.map((item) =>
        item.questionId === questionId ? { ...item, content: e.currentTarget.value } : item
      )
    );
  };
  const deleteQuestion = (questionId: number) => {
    setAddSpecialQuestionData(
      addSpecialQuestionData.filter((question) => question.questionId !== questionId) // 해당되는 id 값 배열에서 삭제
    );
    setIsClickArray(isClickArray.filter((id) => id !== questionId));
    setpostEditWritingData(postEditWritingData.filter((item) => item.questionId !== questionId));
    setText("");
    setpopUpOn(false);
  };

  const popUpFunc = (questionId: number) => {
    if (width <= 530) {
      setDeleteQuestionId(questionId);
      setModal({ ...modal, deleteModal: true });
      document.body.style.overflowY = "hidden";
    } else {
      setpopUpOn(!popUpOn);
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
    <Container>
      <div className="category">
        <TitleSideBox type="special">스페셜 질문</TitleSideBox>
        <img
          src={close}
          alt="X"
          onClick={() => popUpFunc(data?.questionId)}
        />
        {popUpOn && (
          <DeletePopup
            onClick={() => deleteQuestion(data?.questionId)}
            setpopUpOn={setpopUpOn}
          />
        )}
      </div>
      <div className="questionBox">
        <div className="title">
          <div className="textQuestion">
            <MainSemiTitle font={1.125}>
              {idx + 1}. {data?.question}
            </MainSemiTitle>
          </div>
          <PublicButton
            onClick={() => onVisibility(data?.questionId)}
            secret={toggleSwitchOn}
            state="editWrite"
          />
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e, data?.questionId)}
          placeholder="글을 입력해주세요."
        />
      </div>
    </Container>
  );
};
