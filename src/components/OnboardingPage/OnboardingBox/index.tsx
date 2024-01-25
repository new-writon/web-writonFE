import React, { ChangeEvent, useState } from "react";

import { getDuplicateNickname } from "@/apis/OnboardingPage";
import letsintern from "@/assets/logo/letsintern.png";
import { DuplicateBtn } from "@/components/Authorization/RegisterEmailPage/style";
import { KeywordButton } from "@/components/atom/button";
import Input from "@/components/atom/input";

import { Container, JobBox, JobIntroBox, NicknameBox, OnboardBox, Title } from "./style";

const JobCategory = ["기획", "운영", "경영", "개발", "마케팅", "디자인"];
interface onBoardingDataProps {
  nickname: string;
  job: string;
  jobIntroduce: string;
  hireDate: string;
  company: string;
  companyPublic: boolean;
}

export const OnboardingBox = () => {
  const [onBoardingData, setOnBoardingData] = useState<onBoardingDataProps>({
    nickname: "",
    job: "",
    jobIntroduce: "",
    hireDate: "",
    company: "",
    companyPublic: true,
  });

  const [nicknameNum, setNicknameNum] = useState<number>(0);
  const [jobIntroduceNum, setJobIntroduceNum] = useState<number>(0);

  const [duplicateShow, setDuplicateShow] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [errorIdLine, setErrorIdLine] = useState<boolean>(false);
  const [categoryIdx, setCategoryIdx] = useState<string>("");

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

  const handleJobIntroduceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const validCharacters =
      value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g) || [];

    if (value.length < 51) {
      setOnBoardingData({ ...onBoardingData, jobIntroduce: validCharacters.join("") }); // 추출된 문자를 다시 합침
      setJobIntroduceNum(validCharacters.length);
    }
  };

  const DuplicateCheck = async () => {
    try {
      const response = await getDuplicateNickname(
        localStorage.getItem("organization") || "letsintern",
        onBoardingData.nickname
      );
      console.log(response);
      setDuplicate(true);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
    } catch (err) {
      setDuplicate(false);
      setDuplicateShow(true); // 일단 버튼을 누르면 hide 클래스 제거
      setErrorIdLine(true); //에러 라인 전달
      throw new Error("shit");
    }
  };

  return (
    <Container>
      <Title>
        <div className="firstTitle">
          <img
            src={letsintern}
            alt="letsintern"
          />
          <div className="semiTitle">렛츠인턴 2월 TIL 챌린지</div>
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
                  <p className="success">사용 가능한 닉네임예요.</p>
                ) : (
                  <p className="error">사용할 수 없는 닉네임예요.</p>
                )
              ) : (
                ""
              )}
            </div>
            <div>({nicknameNum}/15)</div>
          </div>
        </NicknameBox>
        <JobBox>
          <p className="title">직무 선택</p>
          <p className="semiTitle">현재 인턴 중인 직무를 선택해주세요.</p>
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
          <Input
            type="text"
            value={onBoardingData.jobIntroduce}
            onChange={handleJobIntroduceChange}
            placeholder="어떤 일을 하나요? 간단하게 소개해주세요. ex) 부트캠프 division의 UX/UI 디자인 시스템 구축 업무 어시스트"
          />
          <div className="parityCheck">
            <div></div>
            <div>({jobIntroduceNum}/50)</div>
          </div>
        </JobIntroBox>
      </OnboardBox>
    </Container>
  );
};
