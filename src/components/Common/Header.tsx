import React, { RefObject, useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getMyCommunityStory } from "@/apis/CommunityPage";
import { dateCheck } from "@/apis/header";
import { getChallengingList } from "@/apis/login";
import {
  getNotificationCount,
  getNotificationData,
  patchNotificationCount,
} from "@/apis/notification";
import profile from "@/assets/communityPage/profile.png";
import notificationIcon from "@/assets/header/icon-notification.svg";
import pencil_color_blue from "@/assets/header/pencil_color_blue.svg";
import pencil_color_purple from "@/assets/header/pencil_color_purple.svg";
import pencil_white from "@/assets/header/pencil_white.svg";
import chunsik_icon from "@/assets/logo/chunsik-icon.png";
import letsintern from "@/assets/logo/letsintern.png";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import writon from "@/assets/logo/writon_long.svg";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  communityState,
  notficationNumberState,
  postWritingDataState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { communityStoryProps, challengeListProps, notificationDataType } from "@/types";

import { ChangeOrganization } from "../atom/ChangeOrganization";
import { TooltipNotification } from "../atom/TooltipNotification";
import { TooltipProfile } from "../atom/TooltipProfile";

const ICON = [
  localStorage.getItem("organization") === "렛츠인턴"
    ? letsintern
    : localStorage.getItem("organization") === "카카오"
      ? chunsik_icon
      : writon_icon,
  writon,
];

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

  const [notificationData, setNotificationData] = useState<notificationDataType[]>([]);

  const [notificationTooltip, setNotificationTooltip] = useState<boolean>(false);
  const [notificationNumber, setNotificationNumber] = useRecoilState(notficationNumberState);
  const [organizationToggle, setOrganizationToggle] = useState<boolean>(false);
  const [organizationList, setOriganizationList] = useState<challengeListProps[]>([]);

  const setCommunity = useSetRecoilState(communityState);

  const organizationToggleOnRef = useRef<HTMLDivElement>(null);
  const organizationToggleRef = useRef<HTMLDivElement>(null);
  const profileTooltipRef = useRef<HTMLDivElement>(null);
  const profileTooltipOnRef = useRef<HTMLDivElement>(null);
  const notificationTooltipRef = useRef<HTMLDivElement>(null);
  const notificationTooltipOnRef = useRef<HTMLDivElement>(null);
  const executeAsyncTask = useAsyncWithLoading();

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
    if (notificationTooltip) {
      setNotificationTooltip(false);
    }
    setHeaderTooltip(!headerTooltip);
    if (width <= 530) {
      setTimeout(() => {
        setTooltipMobile(true);
      }, 10);
    }
  };
  const NotificationOn = () => {
    if (width < 531) {
      navigate("/notificationMobile");
    } else {
      if (headerTooltip) {
        setHeaderTooltip(false);
      }
      setNotificationTooltip(!notificationTooltip);
    }
    // 알림 툴팁 딱 열었을 때
    updateNotificationCount();
  };

  const updateNotificationCount = async () => {
    try {
      await patchNotificationCount(
        localStorage.getItem("organization") as string,
        localStorage.getItem("challengeId") as string,
        notificationData.length
      );
      setNotificationNumber(0);
    } catch {
      new Error("shit");
    }
  };

  // 툴팁 외부영역 클릭시, 툴팁 제거
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        profileTooltipRef.current &&
        !profileTooltipRef.current.contains(e.target as Node) &&
        profileTooltipOnRef.current &&
        !profileTooltipOnRef.current.contains(e.target as Node)
      ) {
        setHeaderTooltip(false);
      }
      if (
        notificationTooltipRef.current &&
        !notificationTooltipRef.current.contains(e.target as Node) &&
        notificationTooltipOnRef.current &&
        !notificationTooltipOnRef.current.contains(e.target as Node)
      ) {
        setNotificationTooltip(false);
      }
      if (
        organizationToggleRef.current &&
        !organizationToggleRef.current.contains(e.target as Node) &&
        organizationToggleOnRef.current &&
        !organizationToggleOnRef.current.contains(e.target as Node)
      ) {
        setOrganizationToggle(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [
    profileTooltipRef,
    profileTooltipOnRef,
    notificationTooltipRef,
    notificationTooltipOnRef,
    organizationToggleRef,
    organizationToggleOnRef,
  ]);

  const headerRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const data = await Promise.all([
          getMyCommunityStory(localStorage.getItem("challengeId") || ""),
          getChallengingList(),
        ]);
        if (data[0]?.profile !== null) {
          setProfileImage(data[0]?.profile);
        }
        setUserProfile(data[0]);
        const activeList = data[1].filter(
          (item) => item.organization === localStorage.getItem("organization")
        );
        setChallengeList(activeList);

        const changeData = data[1].reduce(
          (acc: challengeListProps[], cur: challengeListProps) =>
            acc.some((item) => item.organization === cur.organization) ? acc : [...acc, cur],
          []
        );
        setOriganizationList(changeData);
        notificationRendering();
      } catch {
        throw new Error("shit");
      }
    });
  };

  const notificationRendering = async () => {
    try {
      const data = await Promise.all([
        getNotificationData(
          localStorage.getItem("organization") as string,
          localStorage.getItem("challengeId") as string
        ),
        getNotificationCount(
          localStorage.getItem("organization") as string,
          localStorage.getItem("challengeId") as string
        ),
      ]);
      setNotificationData(data[0]);
      setNotificationNumber(data[0].length - data[1].checkCount);
    } catch {
      setNotificationData([]);
      setNotificationNumber(0);

      // throw new Error("shit");
    }
  };

  useEffect(() => {
    notificationRendering();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationTooltip]);

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
                ref={
                  logo !== "writon"
                    ? (organizationToggleOnRef as RefObject<HTMLImageElement>)
                    : null
                }
                onClick={() => {
                  if (logo === writon) {
                    navigate("/");
                    resetState();
                  } else {
                    setOrganizationToggle(!organizationToggle);
                  }
                }}
              />
            </React.Fragment>
          ))}
          {organizationToggle && (
            <ChangeOrganization
              ref={organizationToggleRef}
              organizationList={organizationList}
            />
          )}
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
              src={
                isHover
                  ? pencil_white
                  : localStorage.getItem("organization") === "렛츠인턴"
                    ? pencil_color_purple
                    : pencil_color_blue
              }
              alt="pen"
            />
          </div>
          {/* 알람 아이콘 */}
          <div
            className="notification-cover"
            onClick={NotificationOn}
            ref={notificationTooltipOnRef}
          >
            <img
              src={notificationIcon}
              alt="A"
            />
            {notificationNumber > 0 && (
              <div className={`notification-number ${notificationNumber > 9 && "ten-number"}`}>
                {notificationNumber}
              </div>
            )}
          </div>

          <div
            className="profileImageCover"
            onClick={ProfileOn}
            ref={profileTooltipOnRef}
          >
            <img
              src={profileImage} //{data?.profile}
              alt="profile"
            />
          </div>
        </HeaderRight>
        {notificationTooltip && 531 <= width && (
          <div
            ref={notificationTooltipRef}
            style={{ position: "absolute", right: "0" }}
          >
            <TooltipNotification
              data={notificationData}
              setNotificationTooltip={setNotificationTooltip}
              type="web"
            />
          </div>
        )}

        {headerTooltip && 531 <= width && (
          <div
            ref={profileTooltipRef}
            style={{ position: "absolute", right: "0" }}
          >
            <TooltipProfile
              headerTooltip={headerTooltip}
              TooltipMobile={TooltipMobile}
              userProfile={userProfile}
              setHeaderTooltip={setHeaderTooltip}
              setTooltipMobile={setTooltipMobile}
              ChallengeList={ChallengeList}
            />
          </div>
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
  position: relative;
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
    color: var(--Gray-70, #73777e);
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
  }
  .tab.select {
    border-bottom: 3px solid var(--Main-50, #6272ff);
    color: var(--Gray-100, #1b1d1f);
  }
  .tab.false {
    padding-top: 0;
  }
  .tab:hover {
    color: var(--Gray-100, #1b1d1f);
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
    color: var(--Gray-70, #73777e);
    font-weight: 600;
    font-size: 1.125rem;
    cursor: pointer;
  }
  .tab.select {
    border-bottom: 3px solid var(--Main-50, #6272ff);
    color: var(--Gray-100, #1b1d1f);
  }
  .tab.false {
    padding-top: 0;
  }
  .tab:hover {
    color: var(--Gray-100, #1b1d1f);
  }
  @media (min-width: 531px) {
    display: none;
  }
`;
const HeaderRight = styled.div`
  margin: auto 0;
  display: flex;
  gap: 16px;
  align-items: center;
  .writingBtn {
    display: flex;
    padding: 7px 15px 7px 16px;
    border-radius: 10px;
    background-color: var(--Main-0, #f5f7ff);
    justify-content: center;
    align-items: center;
    gap: 7.5px;
    cursor: pointer;
    min-height: 40px;
  }
  .writingBtn:hover {
    background-color: var(--Main-50, #6272ff);
  }
  .writingBtn:hover p {
    color: var(--White);
  }
  p {
    color: var(--Main-50, #6272ff);
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

  .notification-cover {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  .notification-cover:hover {
    background: var(--Gray-20, #f8f8fa);
  }

  .notification-cover .notification-number {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.75rem;
    color: var(--White, #fff);
    border-radius: 50%;
    padding: 0 4px;
    background-color: var(--Main-50, #6272ff);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2px;
  }

  .notification-cover .notification-number.ten-number {
    font-size: 0.65rem;
    padding-top: 3px;
  }

  .profileImageCover {
    width: 36px;
    height: 36px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #edeef1);
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
  @media (max-width: 610px) {
    p {
      display: none;
    }
    p.responsive {
      display: none;
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
