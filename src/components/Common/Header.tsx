import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getMyCommunityStory } from "@/apis/CommunityPage";
import { dateCheck } from "@/apis/header";
import { getChallengingList } from "@/apis/login";
import profile from "@/assets/communityPage/profile.png";
import pencil_color from "@/assets/header/pencil_color.svg";
import pencil_white from "@/assets/header/pencil_white.svg";
import letsintern from "@/assets/logo/letsintern.png";
import writon from "@/assets/logo/writon_long.svg";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  communityState,
  postWritingDataState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { communityStoryProps, challengeListProps } from "@/types";

import { TooltipProfile } from "../atom/TooltipProfile";

const ICON = [letsintern, writon];
const Tabs = ["내 챌린지", "커뮤니티"];

const Header = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [selectTab, setSelectTab] = useState<string>("내 챌린지");
  const [isHover, setIsHover] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(profile);
  const [headerTooltip, setHeaderTooltip] = useState<boolean>(false);
  const [TooltipMobile, setTooltipMobile] = useState<boolean>(false);

  const [ChallengeList, setChallengeList] = useState<challengeListProps[]>();
  const [userProfile, setUserProfile] = useState<communityStoryProps>();

  const setCommunity = useSetRecoilState(communityState);

  const today = format(new Date(), "yyyy-MM-dd");
  const resetState = useRecoilCallback(({ reset }) => () => {
    reset(addSpecialQuestionState);
    reset(addSpecialQuestionArrayState);
    reset(postWritingDataState);
  });
  const SpaceTab = (tab: string) => {
    setSelectTab(tab);
    resetState();
    switch (tab) {
      case "내 챌린지":
        navigate("/");
        break;
      case "커뮤니티":
        setCommunity(false);
        navigate("/community");
        break;
      case "작성하기":
        dateCheck(navigate, today);

        //navigate(`/writing/${today}`);
        break;
    }
  };

  const ProfileOn = () => {
    setHeaderTooltip(!headerTooltip);
    if (width <= 530) {
      setTimeout(() => {
        setTooltipMobile(true);
      }, 10);
    }
  };

  const headerRendering = async () => {
    try {
      const data = await Promise.all([
        getMyCommunityStory(localStorage.getItem("challengeId") || ""),

        getChallengingList(),
      ]);
      if (data[0]?.profile !== null) {
        setProfileImage(data[0]?.profile);
      }
      console.log(data);
      setUserProfile(data[0]);
      setChallengeList(data[1]);
    } catch {
      throw new Error("shit");
    }
  };

  useEffect(() => {
    if (location.pathname === "/community") {
      setSelectTab("커뮤니티");
    } else if (location.pathname === "/") {
      setSelectTab("내 챌린지");
    } else {
      setSelectTab("");
    }
    headerRendering();
    setHeaderTooltip(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  return (
    <Inner>
      <Container>
        <HeaderLeft>
          {ICON.map((logo, idx) => (
            <React.Fragment key={idx}>
              <img
                src={logo}
                alt={`${logo}`}
                onClick={() => {
                  navigate("/");
                  resetState();
                }}
              />
            </React.Fragment>
          ))}
        </HeaderLeft>
        <HeaderMiddle>
          {Tabs.map((tab, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`tab ${selectTab === tab && "select"}`}
                onClick={() => SpaceTab(tab)}
              >
                {tab}
              </div>
            </React.Fragment>
          ))}
        </HeaderMiddle>
        <HeaderRight>
          <div
            className="writingBtn"
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            onClick={() => {
              if (location.pathname.split("/")[1] !== "writing") {
                SpaceTab("작성하기");
              }
            }}
          >
            <p>회고 작성하기</p>
            <p className="responsive">작성</p>
            <img
              src={isHover ? pencil_white : pencil_color}
              alt="pen"
            />
          </div>
          <div
            className="profileImageCover"
            onClick={ProfileOn}
          >
            <img
              src={profileImage} //{data?.profile}
              alt="profile"
            />
          </div>
        </HeaderRight>
        {headerTooltip && 531 <= width && (
          <TooltipProfile
            headerTooltip={headerTooltip}
            TooltipMobile={TooltipMobile}
            userProfile={userProfile}
            setHeaderTooltip={setHeaderTooltip}
            setTooltipMobile={setTooltipMobile}
            ChallengeList={ChallengeList}
          />
        )}
        {width <= 530 && (
          <TooltipProfile
            headerTooltip={headerTooltip}
            TooltipMobile={TooltipMobile}
            userProfile={userProfile}
            setHeaderTooltip={setHeaderTooltip}
            setTooltipMobile={setTooltipMobile}
            ChallengeList={ChallengeList}
          />
        )}
      </Container>
      <HeaderMiddleResponsive>
        {Tabs.map((tab, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`tab ${selectTab === tab && "select"}`}
              onClick={() => SpaceTab(tab)}
            >
              {tab}
            </div>
          </React.Fragment>
        ))}
      </HeaderMiddleResponsive>
    </Inner>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  height: 71px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 530px) {
    height: 56px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  img:nth-of-type(1) {
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
  img:nth-of-type(2) {
    width: 90px;
    height: fit-content;
    cursor: pointer;
  }
  @media (max-width: 530px) {
    gap: 10px;
    img:nth-of-type(1) {
      width: 32px;
      height: 32px;
    }
    img:nth-of-type(2) {
      width: 66px;
      height: fit-content;
    }
  }
`;
const HeaderMiddle = styled.div`
  display: flex;
  width: 24%;
  min-width: 173px;
  justify-content: space-between;
  .tab {
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 3px;
    color: var(--Gray-70, #757575);
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
  }
  .tab.select {
    border-bottom: 3px solid var(--purple-50, #6a63f5);
    color: var(--Gray10_900, #212121);
  }
  .tab.false {
    padding-top: 0;
  }
  .tab:hover {
    color: var(--Gray10_900, #212121);
  }
  @media (max-width: 530px) {
    display: none;
  }
`;
const HeaderMiddleResponsive = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: sticky;
  top: 0;
  z-index: 9999;
  .tab {
    width: 25%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 3px;
    color: var(--Gray-70, #757575);
    font-weight: 600;
    font-size: 1.125rem;
    cursor: pointer;
  }
  .tab.select {
    border-bottom: 3px solid var(--purple-50, #6a63f5);
    color: var(--Gray10_900, #212121);
  }
  .tab.false {
    padding-top: 0;
  }
  .tab:hover {
    color: var(--Gray10_900, #212121);
  }
  @media (min-width: 531px) {
    display: none;
  }
`;
const HeaderRight = styled.div`
  margin: auto 0;
  display: flex;
  gap: 16px;
  .writingBtn {
    display: flex;
    padding: 7px 15px 7px 16px;
    border-radius: 10px;
    background-color: var(--Main_Purple_10, #f0efff);
    justify-content: center;
    align-items: center;
    gap: 7.5px;
    cursor: pointer;
  }
  .writingBtn:hover {
    background-color: var(--purple-50, #6a63f5);
  }
  .writingBtn:hover p {
    color: var(--White);
  }
  p {
    color: var(--purple-50, #6a63f5);
    font-weight: 500;
    text-align: center;
    margin: auto 0;
    padding-top: 3px;
  }
  p.responsive {
    display: none;
  }
  .writingBtn img {
    width: fit-content;
    height: fit-content;
  }
  .profileImageCover {
    width: 36px;
    height: 36px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #eee);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }

  @media (max-width: 700px) {
    p {
      display: none;
    }
    p.responsive {
      display: block;
    }
  }

  @media (max-width: 530px) {
    .profileImageCover {
      width: 32px;
      height: 32px;
    }
    .writingBtn {
      display: none;
    }
  }
`;
