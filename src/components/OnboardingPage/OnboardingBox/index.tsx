import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getDuplicateNickname,
  postChallengeStart,
  postOnboardingComplete,
} from "@/apis/OnboardingPage";
import letsintern from "@/assets/logo/letsintern.png";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import { DuplicateBtn } from "@/components/Authorization/RegisterEmailPage/style";
import { KeywordButton, OnboardingButton, PublicButton } from "@/components/atom/button";
import { Input } from "@/components/atom/input/index";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";

import {
  CompanyBox,
  Container,
  JobBox,
  JobIntroBox,
  JoinDateBox,
  NicknameBox,
  OnboardBox,
  Title,
} from "./style";

const JobCategory = ["기획", "운영", "개발", "마케팅", "홍보", "디자인"];
interface onBoardingDataProps {
  nickname: string;
  job: string;
  jobIntroduce: string;
  hireDate: string;
  company: string;
  companyPublic: boolean;
  organization: string;
}

export const OnboardingBox = () => {
  const navigate = useNavigate();
  const executeAsyncTask = useAsyncWithLoading();
  const [onBoardingData, setOnBoardingData] = useState<onBoardingDataProps>({
    nickname: "",
    job: "",
    jobIntroduce: "",
    hireDate: "",
    company: "",
    companyPublic: true,
    organization: localStorage.getItem("organization") as string,
  });
  const [ButtonOn, setButtonOn] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [nicknameNum, setNicknameNum] = useState<number>(0);
  const [jobIntroduceNum, setJobIntroduceNum] = useState<number>(0);
  const [companyNum, setCompanyNum] = useState<number>(0);

  const [duplicateShow, setDuplicateShow] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [errorIdLine, setErrorIdLine] = useState<boolean>(false);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDuplicateShow(false);
    setErrorIdLine(false);
    // 정규식을 사용하여 한글, 영어, 숫자만 추출
    const validCharacters = value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g) || [];

    if (value.length < 16) {
      setOnBoardingData({ ...onBoardingData, nickname: validCharacters.join("") }); // 추출된 문자를 다시 합침
      setNicknameNum(validCharacters.length);
    }
  };

  const handleJobIntroduceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const validCharacters =
      value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g) || [];

    if (value.length < 51) {
      setOnBoardingData({ ...onBoardingData, jobIntroduce: validCharacters.join("") }); // 추출된 문자를 다시 합침
      setJobIntroduceNum(validCharacters.length);
    }
  };

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 정규식을 사용하여 한글, 영어, 숫자만 추출
    const validCharacters = value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g) || [];

    if (value.length < 21) {
      setOnBoardingData({ ...onBoardingData, company: validCharacters.join("") }); // 추출된 문자를 다시 합침
      setCompanyNum(validCharacters.length);
    }
  };
  const onVisibility = () => {
    setOnBoardingData({
      ...onBoardingData,
      companyPublic: !onBoardingData.companyPublic,
    });
  };

  const handleHireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");

    // 정해진 날짜 형식에 따라 "-" 추가
    let formattedDate = digitsOnly.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

    // 추가로 하이픈을 포함시키는 로직 (2024 이후에 하이픈 추가)
    if (digitsOnly.length >= 8) {
      formattedDate = formattedDate.replace(/(\d{4}-\d{2})/, "$1");
    }

    // 일 입력 시 이후 입력을 막는 로직
    if (digitsOnly.length >= 10) {
      formattedDate = formattedDate.substring(0, 10);
    }
    if (formattedDate.length < 11) {
      setOnBoardingData({ ...onBoardingData, hireDate: formattedDate });
    }
  };

  const DuplicateCheck = async () => {
    try {
      await getDuplicateNickname(
        localStorage.getItem("organization") as string,
        onBoardingData.nickname
      );
      setDuplicate(true);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
    } catch (err) {
      setDuplicate(false);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
      setErrorIdLine(true); //에러 라인 전달
      throw new Error("shit");
    }
  };

  const OnboardingComplete = async () => {
    executeAsyncTask(async () => {
      if (ButtonOn) {
        try {
          await postOnboardingComplete(onBoardingData);
          try {
            await postChallengeStart(
              localStorage.getItem("organization") as string,
              localStorage.getItem("challengeId") as string
            );
            localStorage.setItem("accessToken", sessionStorage.getItem("accessToken") || "");
            localStorage.setItem("refreshToken", sessionStorage.getItem("refreshToken") || "");
            navigate("/");
          } catch {
            new Error("shit");
          }
        } catch {
          new Error("shit");
        }
      }
    });
  };

  useEffect(() => {
    if (
      onBoardingData.nickname &&
      duplicate &&
      onBoardingData.company &&
      onBoardingData.hireDate &&
      onBoardingData.job &&
      onBoardingData.jobIntroduce
    ) {
      setButtonOn(true);
    }
  }, [
    duplicate,
    onBoardingData.company,
    onBoardingData.hireDate,
    onBoardingData.job,
    onBoardingData.jobIntroduce,
    onBoardingData.nickname,
  ]);

  return (
    <Container>
      <Title>
        <div className="firstTitle">
          <img
            src={localStorage.getItem("organization") !== "렛츠인턴" ? writon_icon : letsintern}
            alt="letsintern"
          />
          <div className="semiTitle">
            {localStorage.getItem("organization") !== "렛츠인턴"
              ? "라이톤의 회고 "
              : "렛츠인턴 TIL "}
            챌린지
          </div>
        </div>
        <div className="secondTitle">
          챌린지 시작 전,
          <br /> 몇가지 정보를 알려주세요
        </div>
      </Title>
      <OnboardBox>
        <NicknameBox>
          <p className="title">닉네임</p>
          <div className="inputNickname">
            <Input
              type="text"
              value={onBoardingData.nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요."
              errorLine={errorIdLine}
            />
            <DuplicateBtn
              className={duplicateShow ? "dupliBtn" : ""}
              onClick={DuplicateCheck}
            >
              중복확인
            </DuplicateBtn>
          </div>
          <div className="parityCheck">
            <div>
              {duplicateShow ? (
                duplicate ? (
                  <p className="success">사용 가능한 닉네임예요.</p>
                ) : (
                  <p className="error">사용할 수 없는 닉네임예요.</p>
                )
              ) : (
                ""
              )}
            </div>
            <div className="numCheck">({nicknameNum}/15)</div>
          </div>
        </NicknameBox>
        <JobBox>
          <p className="title">직무 선택</p>
          <p className="semiTitle">현재 근무 중인 직무를 선택해주세요.</p>
          <div className="jobCategory">
            {JobCategory.map((item, idx) => (
              <React.Fragment key={idx}>
                <KeywordButton
                  onClick={() => setOnBoardingData({ ...onBoardingData, job: item })}
                  select={onBoardingData.job === item}
                >
                  {item}
                </KeywordButton>
              </React.Fragment>
            ))}
          </div>
        </JobBox>
        <JobIntroBox>
          <p className="title">직무에 대한 한 줄 소개</p>
          <textarea
            ref={textareaRef}
            value={onBoardingData.jobIntroduce}
            onChange={(e) => handleJobIntroduceChange(e)}
            placeholder="어떤 일을 하나요? 간단하게 소개해주세요. ex) 부트캠프 division의 UX/UI 디자인 시스템 구축 업무 어시스트"
          />
          <div className="parityCheck">
            <div></div>
            <div className="numCheck">({jobIntroduceNum}/50)</div>
          </div>
        </JobIntroBox>
        <CompanyBox>
          <div className="topTitle">
            <p className="title">회사명</p>
            <PublicButton
              onClick={onVisibility}
              secret={onBoardingData.companyPublic}
              state="editWrite"
            />
          </div>
          <Input
            type="text"
            value={onBoardingData.company}
            onChange={handleCompanyChange}
            placeholder="근무중인 회사 이름을 입력해주세요."
          />
          <div className="parityCheck">
            <div></div>
            <div className="numCheck">({companyNum}/20)</div>
          </div>
        </CompanyBox>
        <JoinDateBox>
          <p className="title">입사 날짜</p>
          <p className="semiTitle">YYYYMMDD의 형식을 맞춰서 작성해주세요.</p>
          <Input
            type="text"
            value={onBoardingData.hireDate}
            onChange={handleHireDateChange}
            placeholder="20240101"
          />
        </JoinDateBox>
        <OnboardingButton
          onClick={OnboardingComplete}
          ButtonOn={ButtonOn}
        >
          완료하고 챌린지 시작하기
        </OnboardingButton>
      </OnboardBox>
    </Container>
  );
};
