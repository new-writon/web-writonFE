import React, { RefObject, useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import styled from "styled-components";

import profile from "@/assets/communityPage/profile.png";
import notificationIcon from "@/assets/header/icon-notification.svg";
import pencil_color_blue from "@/assets/header/pencil_color_blue.svg";
import pencil_color_purple from "@/assets/header/pencil_color_purple.svg";
import pencil_white from "@/assets/header/pencil_white.svg";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import writon from "@/assets/logo/writon_long.svg";
import {
  addSpecialQuestionArrayState,
  addSpecialQuestionState,
  communityState,
  postWritingDataState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { communityStoryProps, challengeListProps } from "@/types";

import { ChangeOrganization } from "../atom/ChangeOrganization";
import { TooltipNotification } from "../atom/TooltipNotification";
import { TooltipProfile } from "../atom/TooltipProfile";
import { useGetCalendarRecordCurrent } from "@/hooks/reactQueryHooks/useMainHooks";
import { dateCheck } from "@/hooks/useDateCheck";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import {
  useGetMyInformation,
  useGetOrganizationsAndChallenges,
  useNotificationDataAndCount,
  useUpdateNotificationCount,
} from "@/hooks/reactQueryHooks/useCommonHooks";
import useWindowWidth from "@/hooks/useWindowWidth";

const Tabs = ["내 챌린지", "커뮤니티"];

const Header = () => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") || "",
    challengeId: localStorage.getItem("challengeId") || "1",
  };
  const { data: CalendarData = [] } = useGetCalendarRecordCurrent(organizationChallengeData);

  const navigate = useNavigate();
  const width = useWindowWidth();
  const [selectTab, setSelectTab] = useState<string>("내 챌린지");
  const [isHover, setIsHover] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(profile);
  const [headerTooltip, setHeaderTooltip] = useState<boolean>(false);
  const [TooltipMobile, setTooltipMobile] = useState<boolean>(false);

  const [ChallengeList, setChallengeList] = useState<challengeListProps[]>();
  const [userProfile, setUserProfile] = useState<communityStoryProps>();

  // const [notificationData, setNotificationData] = useState<notificationDataType[]>([]);

  const [notificationTooltip, setNotificationTooltip] = useState<boolean>(false);
  // const [notificationNumber, setNotificationNumber] = useRecoilState(notficationNumberState);
  const [organizationToggle, setOrganizationToggle] = useState<boolean>(false);
  const [organizationList, setOrganizationList] = useState<challengeListProps[]>([]);

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
        dateCheck(navigate, today, CalendarData);
        break;
    }
  };

  const ProfileOn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 클릭 이벤트 버블링을 막아 툴팁이 닫혔다가 다시 열리는 것을 방지

    // 알림 툴팁이 열려 있으면 닫기
    if (notificationTooltip) {
      setNotificationTooltip(false);
    }
    setHeaderTooltip(!headerTooltip);

    // 모바일에서만 툴팁을 비동기로 보여주기
    if (width <= 530) {
      setTimeout(() => {
        setTooltipMobile(true);
      }, 10); // 10ms 딜레이 후에 모바일 툴팁 활성화
    }
  };

  const { mutate: updateNotificationCount } = useUpdateNotificationCount();

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
    updateNotificationCount({
      organization: organizationChallengeData.organization,
      challengeId: organizationChallengeData.challengeId,
      count: notificationData.length,
    });
  };

  // const updateNotificationCount = async () => {
  //   try {
  //     await patchNotificationCount(
  //       localStorage.getItem("organization") as string,
  //       localStorage.getItem("challengeId") as string,
  //       notificationData.length
  //     );
  //     setNotificationNumber(0);
  //   } catch {
  //     new Error("shit");
  //   }
  // };

  // 툴팁 및 알림 영역 관리
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const organizationRef = useRef<HTMLDivElement>(null);
  const profileOnRef = useRef<HTMLDivElement>(null);
  const notificationOnRef = useRef<HTMLDivElement>(null);
  const organizationOnRef = useRef<HTMLDivElement>(null);

  // useOnclickOutside 훅을 사용해 외부 클릭 감지 및 툴팁 닫기 처리
  useOnclickOutside([profileRef, profileOnRef], () => setHeaderTooltip(false));
  useOnclickOutside([notificationRef, notificationOnRef], () => setNotificationTooltip(false));
  useOnclickOutside([organizationRef, organizationOnRef], () => setOrganizationToggle(false));

  // 리액트 쿼리를 통해 데이터 가져오기
  const { data: myInformation } = useGetMyInformation(organizationChallengeData.challengeId);
  const { data: organizationsAndChallenges, isLoading } = useGetOrganizationsAndChallenges();

  // 데이터가 변경될 때마다 실행
  useEffect(() => {
    if (myInformation) {
      if (myInformation.profile !== null) {
        setProfileImage(myInformation.profile);
      }
      setUserProfile(myInformation);
    }
  }, [myInformation]);

  useEffect(() => {
    if (organizationsAndChallenges) {
      // 사용자의 활성 오가니제이션 필터링
      const activeList = organizationsAndChallenges.filter(
        (item) => item.organization === organizationChallengeData.organization
      );

      setChallengeList(activeList);

      // 중복되지 않는 오가니제이션 리스트 구성
      const uniqueOrganizationList = organizationsAndChallenges.reduce(
        (acc: challengeListProps[], cur: challengeListProps) =>
          acc.some((item) => item.organization === cur.organization) ? acc : [...acc, cur],
        []
      );

      setOrganizationList(uniqueOrganizationList);
    }
  }, [organizationChallengeData.organization, organizationsAndChallenges]);

  ///////////////////////////////////

  // 리액트 쿼리를 통해 알림 데이터 가져오기
  const { data: { notificationData = [], notificationNumber = 0 } = {} } =
    useNotificationDataAndCount(organizationChallengeData);

  useEffect(() => {
    if (location.pathname === "/community") {
      setSelectTab("커뮤니티");
    } else if (location.pathname === "/") {
      setSelectTab("내 챌린지");
    } else {
      setSelectTab("");
    }
  }, [location.pathname]);

  return (
    <Inner>
      {!isLoading && (
        <Container>
          <HeaderLeft>
            <img
              src={
                writon_icon
                // organizationList.length > 0
                //   ? organizationList.find(
                //       (organization) =>
                //         organization.organization === localStorage.getItem("organization")
                //     )?.logo || writon_icon // 로고가 없으면 기본 이미지 표시
                //   : writon_icon // organizationList가 비어있을 때 기본 이미지 표시
              }
              alt="W"
              ref={organizationOnRef as RefObject<HTMLImageElement>}
              onClick={() => setOrganizationToggle(!organizationToggle)}
            />
            <img
              src={writon}
              alt="writon"
              onClick={() => {
                navigate("/");
                resetState();
              }}
            />
            {organizationToggle && (
              <ChangeOrganization
                ref={organizationRef}
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
              ref={notificationOnRef}
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
              ref={profileOnRef}
            >
              <img
                src={profileImage} //{data?.profile}
                alt="profile"
              />
            </div>
          </HeaderRight>

          {notificationTooltip && 531 <= width && (
            <div
              ref={notificationRef}
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
              ref={profileRef}
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
      )}
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
