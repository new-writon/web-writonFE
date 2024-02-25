import { useNavigate } from "react-router-dom";

import { deleteLogout } from "@/apis/header";
import profile from "@/assets/communityPage/profile.png";
import arrow from "@/assets/header/rightArrow.svg";
import { ChallengeCurrentType, communityStoryProps } from "@/types";

import { BackDrop, Bottom, Container, Header, Middle, MypageBtn } from "./style";

export const TooltipProfile = ({
  headerTooltip,
  TooltipMobile,
  userProfile,
  setHeaderTooltip,
  setTooltipMobile,
  ChallengeCurrent,
}: {
  headerTooltip: boolean;
  TooltipMobile: boolean;
  userProfile: communityStoryProps | undefined;
  setHeaderTooltip: (headerTooltip: boolean) => void;
  setTooltipMobile: (TooltipMobile: boolean) => void;
  ChallengeCurrent: ChallengeCurrentType | undefined;
}) => {
  const navigate = useNavigate();

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
        <MypageBtn onClick={() => navigate("/mypage")}>
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
          <div className="currentChallengeTitle">현재 참여중인 챌린지</div>
          <div className="currentChallenge">
            <div className="title">
              {ChallengeCurrent?.organization} {ChallengeCurrent?.challenge} 챌린지
            </div>
            <div className="currentPage">현재 페이지</div>
          </div>
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
