import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  getDuplicateEmail,
  getDuplicateId,
  postEmail,
  postEmailCode,
  postRegister,
} from "@/apis/login";
import checkable from "@/assets/register/signup_checkall.svg";
import checkdisable from "@/assets/register/signup_checkall_disabled.svg";
import { AuthorizationTitle } from "@/components/atom/AuthorizationTitle";
import { Input } from "@/components/atom/input";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { agreeTextState, loadingState } from "@/recoil/atoms";

import {
  AgreeBox,
  Container,
  DuplicateBtn,
  EmailBox,
  EmailCodeBox,
  EmailCodeCheckBtn,
  IdBox,
  // NicknameBox,
  PasswordBox,
  PasswordCheckBox,
  // PhoneNumberBox,
  RegisterBox,
  RegisterBtn,
  RequestBtn,
  SpaceToLogin,
} from "./style";

const agreeText = ["[필수] 라이톤 이용약관 동의", "[필수] 개인정보 수집 및 이용 동의"];

const RegisterEmail = () => {
  const executeAsyncTask = useAsyncWithLoading();
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [userIdNum, setUserIdNum] = useState<number>(0);
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [password1Num, setPassword1Num] = useState<number>(0);
  const [password2Num, setPassword2Num] = useState<number>(0);
  // const [nickname, setNickname] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [checkNum, setCheckNum] = useState<Array<string>>([]);
  const [registerFlag, setRegisterFlag] = useState<boolean>(true);

  //아이디 중복체크
  const [duplicateShow, setDuplicateShow] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [errorIdLine, setErrorIdLine] = useState<boolean>(false);

  //패스워드 중복체크
  const [focus, setFocus] = useState<boolean>(false);
  const [password1Error, setPassword1Error] = useState<boolean>(false);
  const [password2Error, setPassword2Error] = useState<boolean>(false);
  const [password2Show, setPassword2Show] = useState<boolean>(false);

  const [emailCodeShow, setEmailCodeShow] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailcodeCheck, setEmailcodeCheck] = useState<boolean>(false);
  const [emailcodeCheckShow, setEmailcodeCheckShow] = useState<boolean>(false);
  const [emailcodeError, setEmailcodeError] = useState<boolean>(false);

  const setLoading = useSetRecoilState(loadingState);
  const setAgreeTextNum = useSetRecoilState(agreeTextState);
  //id 입력
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDuplicateShow(false);
    setErrorIdLine(false);
    if (value.length < 16) {
      setUserIdNum(value.length);
      setUserId(value);
    }
  };
  const DuplicateCheck = async () => {
    try {
      await getDuplicateId(userId);
      setDuplicate(true);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
    } catch (err) {
      setDuplicate(false);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
      setErrorIdLine(true); //에러 라인 전달
      throw new Error("shit");
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    console.log(e);
    setFocus(true);
  };
  //비밀번호 1번째 입력
  const handlePassword1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (value.length < 31) {
      setPassword1Num(value.length);
    }

    setPassword1(value);

    if (!regex.test(value)) {
      setPassword1Error(false);
    } else {
      setPassword1Error(true);
    }
  };

  // 비밀번호 2차 입력
  const handlePassword2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword2Show(true);
    const value = e.target.value;
    if (value.length < 31) {
      setPassword2Num(value.length);
    }
    setPassword2(value);
    if (password1 !== value) {
      setPassword2Error(false);
    } else {
      setPassword2Error(true);
    }
  };

  // const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   if (value.length < 11) {
  //     setNickname(value);
  //   }
  // };
  // const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  //   if (value.length < 14) {
  //     setPhoneNumber(
  //       value
  //         .replace(/[^0-9]/g, "")
  //         .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
  //         .replace(/(-{1,2})$/g, "")
  //     );
  //   }
  // };

  // 이메일 유효성 검사
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    setEmail(value);

    if (!regex.test(value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  // 이메일 요청 버튼 누를시,
  const RequestEmail = async () => {
    setLoading(true);
    try {
      const res = await getDuplicateEmail(email);
      if (res.status === 200) {
        try {
          const response = await postEmail(email);
          if (response.status === 200) {
            setEmailCodeShow(true);
            setEmailError(false);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          throw new Error("shit");
        }
      }
    } catch {
      setLoading(false);
      setEmail("");
    }
  };

  const handleEmailCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailcodeError(true);
    setEmailcodeCheckShow(false);
    const regex = /^[0-9]*$/;
    if (value.length < 7) {
      if (regex.test(value)) {
        setEmailCode(e.target.value);
      }
    }
  };

  const EmailCodeCheck = async () => {
    try {
      await postEmailCode(email, emailCode);
      // 성공
      setEmailcodeCheck(true);
      setEmailcodeCheckShow(true); // 일단 버튼을 누르면 hide 클래스 제거 -> 시간 멈추기 기능넣어여함.
      setEmailcodeError(false);
    } catch {
      setEmailcodeCheck(false);
      setEmailcodeCheckShow(true); // 일단 버튼을 누르면 hide 클래스 제거
      setEmailcodeError(true);
    }
  };

  const ResendEmailCode = async () => {
    setLoading(true);
    try {
      await postEmail(email);
      setEmailCode(""); //재전송 api
      setEmailError(false);
      setTimeLeft(MINUTES_IN_MS); // 시간 초기화
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  //이용 약관 동의 함수
  const checkAgree = (item: string) => {
    if (checkNum.find((element) => element === item)) {
      const newCheckNum = checkNum.filter((element) => element !== item);
      setCheckNum([...newCheckNum]); // 이간 낳기
    } else {
      //배열 안에서 check 안의 item 있으면 빼기 없으먄 넣기
      setCheckNum([...checkNum, item]); // 이간 낳기
    }
  };

  // 동의서 show
  const ShowAgreeText = (e: MouseEvent<HTMLDivElement>, num: number) => {
    e.stopPropagation();
    setAgreeTextNum(num);
    document.body.style.overflowY = "hidden";
  };

  //회원가입 완료
  const RegisterOk = async () => {
    executeAsyncTask(async () => {
      try {
        await postRegister(userId, password2, email);
        alert("회원가입 완료!");
        navigate("/login");
      } catch {
        throw new Error("shit");
      }
    });
  };

  //이메일 타이머 작동
  useEffect(() => {
    //error
    if (emailCodeShow) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - INTERVAL);
      }, INTERVAL);

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("타이머가 종료되었습니다.");
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeLeft, emailCodeShow]);

  useEffect(() => {
    if (
      duplicate &&
      userId &&
      password1Error &&
      password1 &&
      password2Error &&
      password2 &&
      //nickname && //&& //닉네임 중복체크 넣으면 된다.
      // !emailError //&&
      //emailcodeCheck
      //phoneNumber.length === 13 &&
      checkNum.length === 2
    ) {
      setRegisterFlag(false);
    } else {
      setRegisterFlag(true);
    }
  }, [
    duplicate,
    userId,
    password1Error,
    password1,
    password2Error,
    password2,
    emailError,
    emailcodeCheck,
    //phoneNumber,
    checkNum,
  ]);

  return (
    <Container>
      <AuthorizationTitle>
        <p>회원가입</p>
      </AuthorizationTitle>
      <RegisterBox>
        <IdBox>
          <p className="title">아이디</p>
          <div className="inputId">
            <Input
              type="text"
              value={userId}
              onChange={handleIdChange}
              placeholder="아이디를 입력해주세요."
              errorLine={errorIdLine}
            />
            <DuplicateBtn
              className={duplicateShow ? "title" : ""}
              onClick={DuplicateCheck}
            >
              중복확인
            </DuplicateBtn>
          </div>
          <div className="parityCheck">
            <div>
              {duplicateShow ? (
                duplicate ? (
                  <p className="success">사용 가능한 아이디예요.</p>
                ) : (
                  <p className="error">사용할 수 없는 아이디예요.</p>
                )
              ) : (
                ""
              )}
            </div>
            <div className="numCheck">({userIdNum}/15)</div>
          </div>
        </IdBox>
        <PasswordBox>
          <p className="title">비밀번호</p>
          <p className={!focus ? "caption" : password1Error ? "caption success" : "caption error"}>
            영문, 숫자, 특수문자를 포함한 8~30자 사이의 비밀번호를 입력해주세요.
          </p>
          <div className="inputPassword">
            <Input
              type="password"
              value={password1}
              onChange={handlePassword1Change}
              placeholder="비밀번호를 입력해주세요."
              onFocus={handleFocus}
              errorLine={password1Error}
            />
          </div>
          <div className="parityCheck">
            <div></div>
            <div className="numCheck">({password1Num}/30)</div>
          </div>
        </PasswordBox>

        <PasswordCheckBox>
          <p className="title">비밀번호 확인</p>
          <div className="inputPassword">
            <Input
              type="password"
              value={password2}
              onChange={handlePassword2Change}
              placeholder="비밀번호를 입력해주세요."
              errorLine={password2Error}
            />
          </div>
          <div className="parityCheck">
            <div>
              {password2Show ? (
                password2Error ? (
                  <p className="success">비밀번호가 일치해요.</p>
                ) : (
                  <p className="error">비밀번호가 일치하지 않아요.</p>
                )
              ) : (
                ""
              )}
            </div>
            <div className="numCheck">({password2Num}/30)</div>
          </div>
        </PasswordCheckBox>
        {/* <NicknameBox>
          <p className="title">닉네임</p>
          <div className="inputNickname">
            <Input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="광장에서 사용할 닉네임을 입력해주세요."
            />
          </div>
        </NicknameBox> */}
        <EmailBox>
          <p className="title">이메일 인증</p>
          <div className="inputEmail">
            <Input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="유효한 이메일을 입력해주세요."
            />
          </div>
          <RequestBtn
            disabled={!emailError ? true : false}
            onClick={RequestEmail}
          >
            {emailCodeShow ? "이메일 인증을 요청했어요." : "이메일 인증 요청"}
          </RequestBtn>
        </EmailBox>

        <div className={emailCodeShow ? "codeContainer " : "none"}>
          <EmailCodeBox>
            <p className="caption">이메일로 전송된 인증코드를 입력해주세요.</p>
            <div className="inputEmailCode">
              <Input
                type="text"
                value={emailCode}
                onChange={handleEmailCodeChange}
                placeholder="인증코드 6자리 입력"
                errorLine={emailcodeError}
              />
              <div className={emailcodeCheck ? "none" : "timer"}>
                {minutes}:{second}
              </div>
              <EmailCodeCheckBtn
                //disabled={} 나중에 코드 체크 했을 때, 오는 서버의 Data 값으로 disabled 처리 하거나 다시 요소 올리기
                emailcodeCheck={emailcodeCheck}
                onClick={EmailCodeCheck}
              >
                확인
              </EmailCodeCheckBtn>
            </div>
            <div className="parityCheck">
              <div>
                {emailcodeCheckShow ? (
                  emailcodeCheck ? (
                    <p className="success">인증 완료 되었어요.</p>
                  ) : (
                    <p className="error">인증코드가 일치하지 않아요.</p>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="resend">
              <p className="caption1">이메일을 받지 못하셨나요? </p>
              <p
                className="caption2"
                onClick={ResendEmailCode}
              >
                요청 재전송하기
              </p>
            </div>
          </EmailCodeBox>
        </div>
        {/* <PhoneNumberBox>
          <p className="title">전화번호</p>
          <div className="inputphoneNumber">
            <Input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="전화번호를 입력해주세요."
            />
          </div>
        </PhoneNumberBox> */}
        <AgreeBox>
          <p className="title">이용약관 동의</p>
          {agreeText.map((item, idx) => {
            return (
              <div
                className="checkItem"
                key={idx}
                onClick={() => checkAgree(item)}
              >
                <img
                  src={checkNum.find((element) => element === item) ? checkable : checkdisable}
                  alt="v"
                />
                <div className="agreeTitle">{item}</div>
                <div
                  className="detail"
                  onClick={(e) => ShowAgreeText(e, idx)}
                >
                  자세히
                </div>
              </div>
            );
          })}
        </AgreeBox>
        <RegisterBtn
          disabled={registerFlag}
          onClick={RegisterOk}
        >
          회원가입 완료
        </RegisterBtn>

        <SpaceToLogin>
          <p className="caption1">이미 회원이신가요?</p>
          <p
            className="caption2"
            onClick={() => navigate("/login")}
          >
            로그인
          </p>
        </SpaceToLogin>
      </RegisterBox>
    </Container>
  );
};

export default RegisterEmail;
