import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { deleteLogout } from "@/apis/header";
import profile from "@/assets/communityPage/profile.png";
import arrow from "@/assets/header/rightArrow.svg";
import { challengeListProps, communityStoryProps } from "@/types";

import { CurrrentChallengeButton } from "../button";

import { BackDrop, Bottom, Container, Header, Middle, MypageBtn } from "./style";

export const TooltipProfile = ({
  headerTooltip,
  TooltipMobile,
  userProfile,
  setHeaderTooltip,
  setTooltipMobile,

  ChallengeList,
}: {
  headerTooltip: boolean;
  TooltipMobile: boolean;
  userProfile: communityStoryProps | undefined;
  setHeaderTooltip: (headerTooltip: boolean) => void;
  setTooltipMobile: (TooltipMobile: boolean) => void;
  ChallengeList: challengeListProps[] | undefined;
}) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);

  const Logout = async () => {
    try {
      const response = await deleteLogout();
      console.log(response);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
      window.location.reload();
    } catch {
      alert("로그아웃 불가");
    }
  };

  const BackDropFunc = () => {
    if (TooltipMobile) {
      setTooltipMobile(false);
      setTimeout(() => {
        setHeaderTooltip(false);
      }, 600);
    } else {
      setHeaderTooltip(false);
    }
  };

  const ChangeChallenge = (challengeId: string) => {
    localStorage.setItem("challengeId", challengeId);
    window.location.reload();
  };

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  return (
    <>
      <BackDrop
        $headerTooltip={headerTooltip}
        onClick={BackDropFunc}
      ></BackDrop>
      <Container
        $headerTooltip={headerTooltip}
        $TooltipMobile={TooltipMobile}
      >
        <Header>
          <div className="profileImageCover">
            <img
              src={userProfile?.profile || profile} //{data?.profile}
              alt="profile"
            />
          </div>
          <div className="topRight">
            <div className="nickname">{userProfile?.nickname}</div>
            <div className="email">{userProfile?.email}</div>
          </div>
        </Header>
        <MypageBtn
          onClick={() => {
            if (width >= 530) {
              navigate("/mypage?category=프로필 설정");
            } else {
              alert("모바일은 준비중입니다.");
            }
          }}
        >
          마이페이지
          <img
            src={arrow}
            alt=">"
          />
        </MypageBtn>
        <div className="line"></div>
        <Middle>
          <div className="userAddInfo">
            <div className="job">{userProfile?.job}</div>
            <div className="company">{userProfile?.company || "비공개"}</div>
          </div>
          <div className="oneline">{userProfile?.job_introduce}</div>
        </Middle>
        <div className="line"></div>
        <Bottom>
          {ChallengeList?.filter((data) => data.challengeFinishSign === "0").length !== 0 && (
            <div className="currentChallenge">
              <div className="currentChallengeTitle">참여중인 챌린지</div>
              {ChallengeList?.filter((data) => data.challengeFinishSign === "0").map((item) => (
                <CurrrentChallengeButton
                  challengeId={item.challenge_id.toString()}
                  onClick={() => ChangeChallenge(item.challenge_id.toString())}
                >
                  {item?.organization} {item?.challenge} 챌린지
                </CurrrentChallengeButton>
              ))}
            </div>
          )}
          {ChallengeList?.filter((data) => data.challengeFinishSign === "1").length !== 0 && (
            <div className="pastChallenge">
              <div className="pastChallengeTitle">지난 챌린지</div>
              {ChallengeList?.filter((data) => data.challengeFinishSign === "1").map((item) => (
                <CurrrentChallengeButton
                  challengeId={item.challenge_id.toString()}
                  onClick={() => ChangeChallenge(item.challenge_id.toString())}
                >
                  {item?.organization} {item?.challenge} 챌린지
                </CurrrentChallengeButton>
              ))}
            </div>
          )}
        </Bottom>
        <div
          className="logout"
          onClick={Logout}
        >
          로그아웃
        </div>
      </Container>
    </>
  );
};
