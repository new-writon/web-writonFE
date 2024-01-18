import { Container } from "./style";

export const CompletePopup = () => {
  return (
    <Container>
      <div className="popUpTitle">글 작성을 완료할까요?</div>
      <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
      <div className="popUpBtn">
        <div className="close">취소</div>
        <div className="complete">완료</div>
      </div>
    </Container>
  );
};
