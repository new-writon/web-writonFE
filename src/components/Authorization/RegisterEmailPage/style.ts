import styled from "styled-components";

export const Container = styled.div`
  width: 370px;
  padding: 0 20px;
  box-sizing: content-box;
  margin: 4rem 0 6rem;
`;

export const DuplicateBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 1rem;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 20px;
  color: var(--Shadow_Blue, #135ff3);
  cursor: pointer;
`;
export const RegisterBox = styled.div`
  width: 100%;
  gap: var(--text_b3);
  color: var(--Gray7_600, #757575);
  .codeContainer {
    width: 100%;
    background-color: var(--Gray2_100, #f5f5f5);
    margin-top: 20px;
    display: block;
    transition: 3s;
  }
  .none {
    display: none;
  }
  .title {
    color: var(--Gray10_900, #212121);
  }
  p {
    font-size: 0.875rem;
  }
  .caption {
    font-size: 0.75rem;
  }
  .error {
    color: var(--Error_50, #dc362e);
  }
  .success {
    color: var(--Main_Blue, #135ff3);
  }

  .parityCheck {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    p {
      font-size: 0.75rem;
    }
  }
`;

export const IdBox = styled.div`
  .inputId {
    position: relative;
    margin: 6px 0 4px;
  }
  margin-bottom: 8px;
`;

export const PasswordBox = styled.div`
  position: relative;
  margin-top: 20px;
  .title {
    margin-bottom: 4px;
  }
  .inputPassword {
    margin: 7px 0 2px;
  }
`;
export const PasswordCheckBox = styled.div`
  position: relative;
  .inputPassword {
    margin: 6px 0;
  }
  margin-bottom: 10px;
`;

export const NicknameBox = styled.div`
  margin-top: 20px;
  .inputNickname {
    position: relative;
    margin: 6px 0;
  }
  margin-bottom: 12px;
`;

export const PhoneNumberBox = styled.div`
  .inputphoneNumber {
    position: relative;
    margin: 6px 0;
  }
  margin: 30px 0;
`;
export const EmailBox = styled.div`
  position: relative;
  margin-top: 20px;
  .inputEmail {
    margin: 6px 0 12px;
  }
`;

export const EmailCodeBox = styled.div`
  width: 338px;
  margin: 14px auto 15px;
  padding: 13px 0 16px;
  box-sizing: border-box;
  position: relative;
  .inputEmailCode {
    position: relative;
    margin: 8px 0;
  }

  .timer {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 70px;
    color: var(--Main_Blue, #135ff3);
    font-size: 0.875rem;
  }

  .resend {
    display: flex;
    margin-top: 10px;
    .caption1,
    .caption2 {
      font-size: 0.75rem;
    }
    .caption2 {
      margin-left: 6px;
      text-decoration: underline;
      color: var(--Gray9_800, #424242);
      cursor: pointer;
    }
  }
`;

export const AgreeBox = styled.div`
  margin: 0 auto 30px;

  .checkItem {
    display: flex;
    width: 80%;
    margin: 12px auto 0;
    padding: 10px 0;
    align-items: center;
    font-size: 0.875rem;
  }
  img {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
  .agreeTitle {
    margin-left: 12%;
    cursor: pointer;
  }
  .detail {
    position: absolute;
    right: 0;
    border-bottom: 1px solid #757575;
    cursor: pointer;
  }
`;

// 버튼
export const RequestBtn = styled.button`
  border: 0;
  cursor: pointer;
  box-sizing: border-box;
  width: 370px;
  height: 56px;
  border-radius: 5px;
  background-color: var(--Gray3_200, #eeeeee);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (!props.disabled ? "var(--Main_Blue, #135ff3)" : "var(--Gray6_500,#959595)")};
  background-color: ${(props) =>
    !props.disabled ? "var(--blue, #eaf5ff)" : "var(--Gray3_200,#eeeeee)"};
  font-weight: 600;
  font-size: 1.125rem;
`;

export const EmailCodeCheckBtn = styled.div<{ emailcodeCheck: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${(props) =>
    props.emailcodeCheck ? "var(--Gray3_200, #eee)" : "   var(--Main_Blue, #135ff3)"};
  color: ${(props) =>
    props.emailcodeCheck ? "var(--Gray6_500, #959595)" : "   var(--White, #fff)"};
  width: 42px;
  height: 28px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterBtn = styled.button`
  border: 0;
  padding: 0;
  border-radius: 5px;
  color: ${(props) => (!props.disabled ? "var(--White, #fff)" : "var(--Gray6_500,#959595)")};
  background-color: ${(props) =>
    !props.disabled ? "var(--Main_Blue,#135ff3)" : "var(--Gray3_200,#eeeeee)"};

  height: 56px;
  width: 100%;
  cursor: ${(props) => (!props.disabled ? "pointer" : "")};
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const SpaceToLogin = styled.div`
  display: flex;
  justify-content: center;
  .caption2 {
    margin-left: 10px;
    text-decoration: underline;
    color: var(--Gray9_800, #424242);
    cursor: pointer;
  }
`;
