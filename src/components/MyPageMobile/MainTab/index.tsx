import React from "react";

import { useNavigate } from "react-router-dom";

import frontArrow from "@/assets/mypage/backArrow.svg";
import { myPageProps } from "@/types";

import { Bottom, Container, Top } from "./style";

const myInformation = ["프로필 설정", "보안 설정"];
const myActivity = ["작성한 회고", "작성한 댓글", "알림"];
export const MainTab = ({
  myData,
  setActiveCategory,
}: {
  myData: myPageProps | undefined;
  setActiveCategory: (activeCategry: string) => void;
}) => {
  const navigate = useNavigate();
  const category = new URL(window.location.href).searchParams.get("category");

  const changeCategory = (category: string) => {
    navigate(`/mypageMobile?category=${category}`);
    setActiveCategory(category);
  };

  return (
    <Container>
      <Top>
        <div className="topWrapper">
          <div className="profileImageCover">
            <img
              src={myData?.userProfile}
              alt="profile"
            />
          </div>
          <div className="etc">
            <div className="nickname">{myData?.nickname}</div>
            <div className="email">{myData?.email}</div>
          </div>
        </div>
      </Top>
      <Bottom>
        <div className="myInformation">
          <div className="title">
            <p>내 정보</p>
          </div>
          {myInformation.map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`${category === item && "active"} category`}
                onClick={() => changeCategory(item)}
              >
                {item}
                <img
                  src={frontArrow}
                  alt=">"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="line"></div>
        <div className="myActivity">
          <div className="title">
            <p>내 활동</p>
          </div>
          {myActivity.map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`${category === item && "active"} category`}
                onClick={() => changeCategory(item)}
              >
                {item}
                <img
                  src={frontArrow}
                  alt=">"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </Bottom>
    </Container>
  );
};
