import { writingPagePopUpProps } from "@/types";

import { Container } from "./style";

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
