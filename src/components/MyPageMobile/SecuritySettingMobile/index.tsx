import { Container } from "./style";

export const SecuritySettingMobile = () => {
  return (
    <Container>
      <div className="title">보안 설정</div>
      <div className="editField">
        <div className="editTitle">비밀번호</div>
        <div
          className="editPasswordBtn"
          onClick={() => alert("아직 준비중입니다!")}
        >
          비밀번호 변경
        </div>
      </div>
    </Container>
  );
};
