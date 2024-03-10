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

  const onVisibility = (question_id: number) => {
    setToggleSwitchOn(!toggleSwitchOn);
    setpostEditWritingData(
      //questionid 가 같은 곳에 visbility 집아넣는다.
      postEditWritingData?.map((item) =>
        item.question_id === question_id ? { ...item, visibility: !toggleSwitchOn } : item
      )
    );
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, question_id: number) => {
    setText(e.currentTarget.value);
    setpostEditWritingData(
      postEditWritingData.map((item) =>
        item.question_id === question_id ? { ...item, content: e.currentTarget.value } : item
      )
    );
  };
  const deleteQuestion = (question_id: number) => {
    setAddSpecialQuestionData(
      addSpecialQuestionData.filter((question) => question.question_id !== question_id) // 해당되는 id 값 배열에서 삭제
    );
    setIsClickArray(isClickArray.filter((id) => id !== question_id));
    setpostEditWritingData(postEditWritingData.filter((item) => item.question_id !== question_id));
    setText("");
    setpopUpOn(false);
  };

  const popUpFunc = (question_id: number) => {
    if (width <= 530) {
      setDeleteQuestionId(question_id);
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
          onClick={() => popUpFunc(data?.question_id)}
        />
        {popUpOn && (
          <DeletePopup
            onClick={() => deleteQuestion(data?.question_id)}
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
            onClick={() => onVisibility(data?.question_id)}
            secret={toggleSwitchOn}
            state="editWrite"
          />
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e, data?.question_id)}
          placeholder="글을 입력해주세요."
        />
      </div>
    </Container>
  );
};
