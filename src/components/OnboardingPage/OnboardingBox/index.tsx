import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getDuplicateNickname } from "@/apis/OnboardingPage";

import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import { DuplicateBtn } from "@/components/Authorization/RegisterEmailPage/style";
import { KeywordButton, OnboardingButton, PublicButton } from "@/components/atom/button";
import { Input } from "@/components/atom/input/index";
import clalendarIcon from "@/assets/mainPage/icon-calendar.svg";

import {
  Calendar,
  CalendarButton,
  CompanyBox,
  Container,
  JobBox,
  JobIntroBox,
  JoinDateBox,
  NicknameBox,
  OnboardBox,
  Title,
} from "./style";
import { useGetOrganizationsAndChallenges } from "@/hooks/reactQueryHooks/useCommonHooks";
import { challengeListProps, onBoardingDataProps } from "@/types";
import { SubCalendar } from "@/components/atom/SubCalendar";
import { format } from "date-fns";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import {
  useGetOrganizationPosition,
  usePostChallengeStart,
  usePostOnboarding,
} from "@/hooks/reactQueryHooks/useMainHooks";

const JobCategory = ["기획", "운영", "개발", "마케팅", "디자인", "기타"];

export const OnboardingBox = () => {
  const navigate = useNavigate();
  const [onBoardingData, setOnBoardingData] = useState<onBoardingDataProps>({
    nickname: "",
    position: "",
    positionIntroduce: "",
    hireDate: "",
    company: "",
    companyPublic: true,
    organization: localStorage.getItem("organization") as string,
  });
  const [ButtonOn, setButtonOn] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [nicknameNum, setNicknameNum] = useState<number>(0);
  const [positionIntroduceNum, setPositionIntroduceNum] = useState<number>(0);
  const [companyNum, setCompanyNum] = useState<number>(0);

  const [duplicateShow, setDuplicateShow] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [errorIdLine, setErrorIdLine] = useState<boolean>(false);
  const [organizationList, setOrganizationList] = useState<challengeListProps[]>([]);
  const [date, setDate] = useState<Date | string>("");
  const [calendarOn, setCalendarOn] = useState<boolean>(false);

  // 툴팁 관리
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarOnRef = useRef<HTMLDivElement>(null);
  useOnclickOutside([calendarRef, calendarOnRef], () => setCalendarOn(false));

  const { data: organizationsAndChallenges, isLoading } = useGetOrganizationsAndChallenges();
  const { data: positionNames } = useGetOrganizationPosition(
    localStorage.getItem("organization") || "라이톤"
  );
  const { mutate: postOnboardingMutate } = usePostOnboarding();
  const { mutate: postChallengeStartMutate } = usePostChallengeStart();

  useEffect(() => {
    if (organizationsAndChallenges) {
      // 중복되지 않는 오가니제이션 리스트 구성
      const uniqueOrganizationList = organizationsAndChallenges.reduce(
        (acc: challengeListProps[], cur: challengeListProps) =>
          acc.some((item) => item.organization === cur.organization) ? acc : [...acc, cur],
        []
      );

      setOrganizationList(uniqueOrganizationList);
    }
  }, [organizationsAndChallenges]);

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

  const handlePositionIntroduceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const validCharacters =
      value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g) || [];

    if (value.length < 51) {
      setOnBoardingData({ ...onBoardingData, positionIntroduce: validCharacters.join("") }); // 추출된 문자를 다시 합침
      setPositionIntroduceNum(validCharacters.length);
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

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Date 객체로 변환
    const date = new Date(dateString);

    // 날짜 객체가 유효한지 확인
    if (isNaN(date.getTime())) {
      return false;
    }

    // 날짜 문자열과 비교
    const [year, month, day] = dateString.split("-").map(Number);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return false;
    }

    return true;
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
    if (!isValidDate(onBoardingData.hireDate)) {
      alert("날짜가 정확하지 않습니다!");
      return;
    }
    if (!duplicate) {
      alert("닉네임 중복확인을 체크해주세요!");
      return;
    }

    // 다음 온보딩이 필요한지 확인
    const nextOrganization = localStorage.getItem("nextOrganization");
    const nextChallengeId = localStorage.getItem("nextChallengeId");

    // 온보딩 완료 후 챌린지 시작
    postOnboardingMutate(onBoardingData, {
      onSuccess: () => {
        postChallengeStartMutate(
          {
            organization: localStorage.getItem("organization") as string,
            challengeId: localStorage.getItem("challengeId") as string,
          },
          {
            onSuccess: () => {
              // 토큰 저장
              localStorage.setItem("accessToken", sessionStorage.getItem("accessToken") || "");
              localStorage.setItem("refreshToken", sessionStorage.getItem("refreshToken") || "");

              // 다음 온보딩이 필요한 경우
              if (nextOrganization && nextChallengeId) {
                // 다음 온보딩을 위한 설정
                localStorage.setItem("organization", nextOrganization);
                localStorage.setItem("challengeId", nextChallengeId);
                // 임시 저장 데이터 삭제
                localStorage.removeItem("nextOrganization");
                localStorage.removeItem("nextChallengeId");
                // 다음 온보딩으로 이동

                alert("다음 온보딩이 필요합니다.");
                navigate("/onboarding");
              } else {
                // 모든 온보딩 완료
                navigate("/");
              }
            },
            onError: () => {
              alert("챌린지 시작에 실패했습니다.");
            },
          }
        );
      },
      onError: () => {
        alert("온보딩에 실패했습니다.");
      },
    });
  };

  useEffect(() => {
    if (
      onBoardingData.nickname &&
      duplicate &&
      onBoardingData.company &&
      onBoardingData.hireDate &&
      onBoardingData.position &&
      onBoardingData.positionIntroduce
    ) {
      setButtonOn(true);
    }
  }, [
    duplicate,
    onBoardingData.company,
    onBoardingData.hireDate,
    onBoardingData.position,
    onBoardingData.positionIntroduce,
    onBoardingData.nickname,
  ]);

  useEffect(() => {
    if (!date) return;
    setOnBoardingData({ ...onBoardingData, hireDate: format(date, "yyyy-MM-dd") });
    setCalendarOn(false);
  }, [date]);

  if (isLoading) return <></>;
  return (
    <Container>
      <Title>
        <div className="firstTitle">
          <img
            src={
              // writon_icon
              organizationList.length > 0
                ? organizationList.find(
                    (organization) =>
                      organization.organization === localStorage.getItem("organization")
                  )?.logo || writon_icon // 로고가 없으면 기본 이미지 표시
                : writon_icon // organizationList가 비어있을 때 기본 이미지 표시
            }
            onError={(e) => {
              e.currentTarget.src = writon_icon; // 이미지 로딩에 실패하면 기본 이미지로 교체
            }}
            alt="W"
          />
          <div className="semiTitle">
            {localStorage.getItem("organization") || "라이톤"}
            &nbsp;챌린지
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
          <p className="title">
            {localStorage.getItem("organization") !== "렛츠인턴" ? "포지션" : "직무"} 선택
          </p>
          <p className="semiTitle">
            {" "}
            {localStorage.getItem("organization") !== "렛츠인턴"
              ? "현재 포지션을"
              : "현재 근무 중인 직무를"}{" "}
            선택해주세요.
          </p>
          <div className="jobCategory">
            {(positionNames?.length ? positionNames : JobCategory)?.map((item, idx) => (
              <React.Fragment key={idx}>
                <KeywordButton
                  onClick={() => setOnBoardingData({ ...onBoardingData, position: item })}
                  select={onBoardingData.position === item}
                >
                  {item}
                </KeywordButton>
              </React.Fragment>
            ))}
          </div>
        </JobBox>
        <JobIntroBox>
          <p className="title">
            {" "}
            {localStorage.getItem("organization") !== "렛츠인턴" ? "포지션" : "직무"}에 대한 한 줄
            소개
          </p>
          <textarea
            ref={textareaRef}
            value={onBoardingData.positionIntroduce}
            onChange={(e) => handlePositionIntroduceChange(e)}
            placeholder={`어떤 일을 하나요? 간단하게 소개해주세요.\nex) 부트캠프 division의 UX/UI 디자인 시스템 구축 업무 어시스트`}
          />
          <div className="parityCheck">
            <div></div>
            <div className="numCheck">({positionIntroduceNum}/50)</div>
          </div>
        </JobIntroBox>
        <CompanyBox>
          <div className="topTitle">
            <p className="title">
              {" "}
              {localStorage.getItem("organization") !== "렛츠인턴" ? "팀명" : "회사명"}
            </p>
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
            placeholder={
              localStorage.getItem("organization") !== "렛츠인턴"
                ? " 함께 하고 있는 팀 이름을 알려주세요. ex) 없음"
                : "근무중인 회사 이름을 입력해주세요."
            }
          />
          <div className="parityCheck">
            <div></div>
            <div className="numCheck">({companyNum}/20)</div>
          </div>
        </CompanyBox>
        <JoinDateBox>
          <p className="title">
            {localStorage.getItem("organization") !== "렛츠인턴" ? "합류 날짜" : "입사 날짜"}
          </p>
          <p className="semiTitle">YYYYMMDD의 형식을 맞춰서 작성해주세요.</p>
          <Input
            type="text"
            value={onBoardingData.hireDate}
            onChange={handleHireDateChange}
            placeholder="20240101"
          />
          <CalendarButton>
            <img
              src={clalendarIcon}
              alt="달력"
              ref={calendarOnRef as RefObject<HTMLImageElement>}
              onClick={() => setCalendarOn(!calendarOn)}
            />
            {calendarOn && (
              <Calendar ref={calendarRef}>
                <SubCalendar
                  value={date || new Date()}
                  clickDay={(date) => setDate(date)}
                />
              </Calendar>
            )}
          </CalendarButton>
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
