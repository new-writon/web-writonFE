/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { useSetRecoilState } from "recoil";

import { putMyPageData } from "@/apis/MyPage";
import { getDuplicateNickname } from "@/apis/OnboardingPage";
import { KeywordButton, PublicButton } from "@/components/atom/button";
import { MyPageInput } from "@/components/atom/input/style";
import { accountNumberState } from "@/recoil/atoms";
import { myPageProps, myProfileEditProps } from "@/types";

import {
  AccountButton,
  BasicSetting,
  ChallengeSetting,
  Container,
  DuplicateBtn,
  EditBox,
  EditButton,
  Top,
} from "./style";

const JobCategory = ["기획", "운영", "개발", "마케팅", "홍보", "디자인"];

export const ProfileSetting = ({ myData }: { myData: myPageProps | undefined }) => {
  console.log(myData);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [ProfileData, setProfileData] = useState<myProfileEditProps>({
    nickname: "",
    job: "",
    jobIntroduce: "",
    hireDate: "",
    company: "",
    companyPublic: false,
  });
  const [duplicateShow, setDuplicateShow] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [errorIdLine, setErrorIdLine] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const setAccountNumberModal = useSetRecoilState(accountNumberState);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDuplicateShow(false);
    setErrorIdLine(false);
    // 정규식을 사용하여 한글, 영어, 숫자만 추출
    const validCharacters = value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g) || [];

    if (value.length < 16) {
      setProfileData({ ...ProfileData, nickname: validCharacters.join("") }); // 추출된 문자를 다시 합침
    }
  };
  const DuplicateCheck = async () => {
    try {
      await getDuplicateNickname(
        localStorage.getItem("organization") || "letsintern",
        ProfileData.nickname
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

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 정규식을 사용하여 한글, 영어, 숫자만 추출
    const validCharacters = value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g) || [];

    if (value.length < 21) {
      setProfileData({ ...ProfileData, company: validCharacters.join("") }); // 추출된 문자를 다시 합침
    }
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
      setProfileData({ ...ProfileData, hireDate: formattedDate });
    }
  };
  const handleJobIntroduceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const validCharacters =
      value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g) || [];

    if (value.length < 51) {
      setProfileData({ ...ProfileData, jobIntroduce: validCharacters.join("") }); // 추출된 문자를 다시 합침
    }
  };

  const EditComplete = async () => {
    // 수정 api 발송 ProfileData
    try {
      await putMyPageData(localStorage.getItem("organization") || "", ProfileData);
      setEditActive(false);
      window.location.reload();
      window.scrollTo({ top: 0 });
    } catch {
      new Error("siht");
    }
  };

  useEffect(() => {
    setProfileData({
      ...ProfileData,
      nickname: myData?.nickname,
      job: myData?.job,
      jobIntroduce: myData?.jobIntroduce,
      hireDate: format(myData?.hiredate || new Date(), "yyyy-MM-dd"),
      company: myData?.company,
      companyPublic: myData?.companyPublic === 1 ? true : false,
    });
  }, [myData, editActive]);

  return (
    <Container>
      <Top>
        <div className="title">기본 정보</div>
        <div
          className={`${editActive ? "active" : "notactive"} editBtn`}
          onClick={() => setEditActive(true)}
        >
          {editActive ? "수정중" : "내 정보 수정"}
        </div>
      </Top>
      {!editActive ? (
        <>
          <BasicSetting>
            <div className="editField">
              <div className="editTitle">닉네임</div>
              <div className="editText">{myData?.nickname}</div>
            </div>
            <div className="editField">
              <div className="editTitle">이메일</div>
              <div className="editText">{myData?.email}</div>
            </div>
            <div className="editField">
              <div className="editTitle">계좌번호</div>
              <div className="editText account">
                {myData?.accountNumber === null
                  ? "계좌번호를 입력해주세요."
                  : `${myData?.bank}  ${myData?.accountNumber}`}
                <AccountButton
                  onClick={() => {
                    setAccountNumberModal(true);
                    document.body.style.overflowY = "hidden";
                  }}
                >
                  {myData?.accountNumber === null ? "추가" : "변경"}
                </AccountButton>
                {/* 계좌번호 데이터가 없으면 입력해주세요 글씨 , 추가 버튼 만약 있으면 계좌번호랑 변경 버튼 */}
              </div>
            </div>
          </BasicSetting>
          <ChallengeSetting>
            <div className="title">챌린지 참여 정보</div>

            <div className="editField">
              <div className="editTitle">회사명</div>
              <div className="editText">
                {myData?.company}
                <PublicButton
                  onClick={() => {}}
                  secret={myData?.companyPublic === 1 ? true : false}
                  state="default"
                />
              </div>
            </div>
            <div className="editField">
              <div className="editTitle">입사 날짜</div>
              <div className="editText">{format(myData?.hiredate || new Date(), "yyyy-MM-dd")}</div>
            </div>
            <div className="editField">
              <div className="editTitle">직무</div>
              <div className="editJob">
                <KeywordButton
                  onClick={() => {}}
                  select={false}
                >
                  {myData?.job}
                </KeywordButton>
              </div>
            </div>
            <div className="editField">
              <div className="editTitle">직무에 대한 한 줄 소개</div>
              <div className="editText">{myData?.jobIntroduce}</div>
            </div>
          </ChallengeSetting>
        </>
      ) : (
        <>
          <BasicSetting>
            <div className="editField">
              <div className="editTitle">닉네임</div>
              <EditBox>
                <div className="inputNickname">
                  <MyPageInput
                    type="text"
                    value={ProfileData.nickname || ""}
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
                  <div className="textCheck">
                    {duplicateShow ? (
                      duplicate ? (
                        <p className="success">사용 가능한 닉네임이에요.</p>
                      ) : (
                        <p className="error">사용할 수 없는 닉네임이에요.</p>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="numCheck">({ProfileData?.nickname?.length}/15)</div>
                </div>
              </EditBox>
            </div>
            <div className="editField">
              <div className="editTitle">이메일</div>
              <div className="editText editEmail">{myData?.email}</div>
            </div>
            <div className="editField">
              <div className="editTitle">계좌번호</div>
              <div className="editText account">
                {myData?.accountNumber === null
                  ? "계좌번호를 입력해주세요."
                  : `${myData?.bank}  ${myData?.accountNumber}`}
                <AccountButton
                  onClick={() => {
                    setAccountNumberModal(true);
                    document.body.style.overflowY = "hidden";
                  }}
                >
                  {myData?.accountNumber === null ? "추가" : "변경"}
                </AccountButton>
              </div>
            </div>
          </BasicSetting>
          <ChallengeSetting>
            <div className="title">챌린지 참여 정보</div>

            <div className="editField">
              <div className="editTitle">회사명</div>
              <EditBox>
                <MyPageInput
                  type="text"
                  value={ProfileData.company || ""}
                  onChange={handleCompanyChange}
                  placeholder="근무중인 회사 이름을 입력해주세요."
                />
                <PublicButton
                  onClick={() =>
                    setProfileData({
                      ...ProfileData,
                      companyPublic: !ProfileData.companyPublic,
                    })
                  }
                  secret={ProfileData?.companyPublic}
                  state="edit"
                />
              </EditBox>
            </div>
            <div className="editField">
              <div className="editTitle">입사 날짜</div>
              <EditBox>
                <MyPageInput
                  type="text"
                  value={ProfileData.hireDate || ""}
                  onChange={handleHireDateChange}
                  placeholder="20240101"
                />
              </EditBox>
            </div>
            <div className="editField jobField">
              <div className="editTitle">직무</div>
              <div className="editJob">
                {JobCategory.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <KeywordButton
                      onClick={() => setProfileData({ ...ProfileData, job: item })}
                      select={ProfileData.job === item}
                    >
                      {item}
                    </KeywordButton>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="editField jobIntroduceField">
              <div className="editTitle">직무에 대한 한 줄 소개</div>
              <EditBox>
                <textarea
                  ref={textareaRef}
                  value={ProfileData.jobIntroduce}
                  onChange={(e) => handleJobIntroduceChange(e)}
                  placeholder="어떤 일을 하나요? 간단하게 소개해주세요. ex) 부트캠프 division의 UX/UI 디자인 시스템 구축 업무 어시스트"
                />
                <div className="parityCheck">
                  <div></div>
                  <div className="numCheck">({ProfileData.jobIntroduce?.length}/50)</div>
                </div>
              </EditBox>
            </div>
          </ChallengeSetting>
          <EditButton>
            <div
              className="editCloseBtn"
              onClick={() => {
                setEditActive(false);
                window.scrollTo({ top: 0 });
              }}
            >
              취소
            </div>
            <div
              className="editCompleteBtn"
              onClick={EditComplete}
            >
              수정 완료
            </div>
          </EditButton>
        </>
      )}
    </Container>
  );
};
