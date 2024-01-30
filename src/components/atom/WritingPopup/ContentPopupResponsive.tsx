import { useRecoilState, useRecoilValue } from "recoil";

import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  modalBackgroundState,
  modalContentState,
  postWritingDataState,
} from "@/recoil/atoms";

import { ContainerResponsive } from "./style";

const ContentPopupResponsive = () => {
  const modalContent = useRecoilValue(modalContentState);
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const [isClickArray, setIsClickArray] = useRecoilState(addSpecialQuestionState);
  const [addSpecialQuestionData, setAddSpecialQuestionData] = useRecoilState(
    addSpecialQuestionArrayState
  );
  const [postWritingData, setpostWritingData] = useRecoilState(postWritingDataState);

  const modalClickFunc = () => {
    if (!isClickArray.includes(modalContent.question_id)) {
      // isClickArray에 없을 경우만 추가함.
      setIsClickArray([...isClickArray, modalContent.question_id]);
      setAddSpecialQuestionData([
        ...addSpecialQuestionData,
        { question_id: modalContent.question_id, question: modalContent.question },
      ]);
      setpostWritingData([
        ...postWritingData,
        { question_id: modalContent.question_id, content: "", visibility: true },
      ]);
    }
    setModal({ ...modal, contentModal: false });
    document.body.style.overflowY = "auto";
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="popUpTitle">이 질문을 추가할까요?</div>
        <div>
          <div className="popUpSemiTitle">{modalContent?.category} 키워드 관련 스페셜 질문</div>
          <div className="popUpmessage">{modalContent?.question}</div>
        </div>
        <div className="popUpBtn">
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, contentModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
          <div
            className="complete"
            onClick={modalClickFunc}
          >
            추가하기
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};

export default ContentPopupResponsive;
