import { useRecoilState, useRecoilValue } from "recoil";

import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  deleteQuestionIdState,
  modalBackgroundState,
  postWritingDataState,
} from "@/recoil/atoms";
import { writingPagePopUpProps } from "@/types";

import { Container, ContainerResponsive } from "./style";

export const DeletePopup = ({ onClick, setpopUpOn }: writingPagePopUpProps) => {
  return (
    <Container>
      <div className="popUpTitle">해당 질문을 삭제하시겠어요?</div>
      <div className="popUpmessage">질문을 삭제하면 작성한 내용을 다시 복구할 수 없어요.</div>
      <div className="popUpBtn">
        <div
          className="delete"
          onClick={onClick}
        >
          삭제하기
        </div>
        <div
          className="close"
          onClick={() => setpopUpOn(false)}
        >
          취소
        </div>
      </div>
    </Container>
  );
};

export const DeletePopupResponsive = () => {
  const deleteQuestionId = useRecoilValue(deleteQuestionIdState);
  const [addSpecialQuestionData, setAddSpecialQuestionData] = useRecoilState(
    addSpecialQuestionArrayState
  );
  const [postWritingData, setpostWritingData] = useRecoilState(postWritingDataState);

  const [isClickArray, setIsClickArray] = useRecoilState(addSpecialQuestionState); //사이드 바에 있는 추가한 거 지우기 recoil

  const [modal, setModal] = useRecoilState(modalBackgroundState);

  const deleteClickFunc = () => {
    setAddSpecialQuestionData(
      addSpecialQuestionData.filter((question) => question.question_id !== deleteQuestionId) // 해당되는 id 값 배열에서 삭제
    );
    setIsClickArray(isClickArray.filter((id) => id !== deleteQuestionId));
    setpostWritingData(postWritingData.filter((item) => item.question_id !== deleteQuestionId));
    setModal({ ...modal, deleteModal: false });
    document.body.style.overflowY = "auto";
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="popUpTitle">해당 질문을 삭제하시겠어요?</div>
        <div className="popUpmessage">질문을 삭제하면 작성한 내용을 다시 복구할 수 없어요.</div>
        <div className="popUpBtn">
          <div
            className="delete"
            onClick={deleteClickFunc}
          >
            삭제하기
          </div>
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, deleteModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};
