import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import pencil_color from "@/assets/header/pencil_color.svg";
import pencil_white from "@/assets/header/pencil_white.svg";
import profile from "@/assets/header/profile.svg";
import letsintern from "@/assets/logo/letsintern.png";
import writon from "@/assets/logo/writon_long.svg";
import { Inner } from "@/style/global";

const ICON = [letsintern, writon];
const Tabs = ["내 챌린지", "커뮤니티"];

const Header = () => {
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState<string>("내 챌린지");
  const [isHover, setIsHover] = useState<boolean>(false);

  const SpaceTab = (tab: string) => {
    setSelectTab(tab);
    switch (tab) {
      case "내 챌린지":
        navigate("/");
        break;
      case "커뮤니티":
        navigate("/community");
        break;
    }
  };
  return (
    <Inner>
      <Container>
        <HeaderLeft>
          {ICON.map((logo, idx) => (
            <React.Fragment key={idx}>
              <img
                src={logo}
                alt={`${logo}`}
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
          >
            <p>회고 작성하기</p>
            <img
              src={isHover ? pencil_white : pencil_color}
              alt="pen"
            />
          </div>
          <img
            src={profile}
            alt="profile"
          />
        </HeaderRight>
      </Container>
    </Inner>
  );
};

export default Header;

const Container = styled.div`
  height: 71px;
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  img:nth-child(1) {
    width: 42px;
    height: fit-content;
  }
  img:nth-child(2) {
    width: 90px;
    height: fit-content;
    cursor: pointer;
  }
`;
const HeaderMiddle = styled.div`
  display: flex;
  width: 24%;
  min-width: 173px;
  justify-content: space-between;
  .tab {
    width: 71px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 3px;
    color: var(--Gray7_600);
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
  }
  .tab.select {
    border-bottom: 3px solid var(--Main_Purple);
    color: var(--Gray10_900);
  }
  .tab.false {
    padding-top: 0;
  }
  .tab:hover {
    color: var(--Gray10_900);
  }
`;
const HeaderRight = styled.div`
  margin: auto 0;
  display: flex;
  gap: 16px;
  .writingBtn {
    display: flex;
    width: 139px;
    height: 36px;
    border-radius: 10px;
    background-color: var(--Main_Purple_10);
    justify-content: center;
    align-items: center;
    gap: 7.5px;
    cursor: pointer;
  }
  .writingBtn:hover {
    background-color: var(--Main_Purple);
  }
  .writingBtn:hover p {
    color: var(--White);
  }
  p {
    color: var(--Main_Purple);
    font-weight: 500;
    line-height: 38px;
    text-align: center;
    margin: auto 0;
  }
  .writingBtn img {
    width: fit-content;
    height: fit-content;
  }
  img[alt="profile"] {
    cursor: pointer;
  }
`;
