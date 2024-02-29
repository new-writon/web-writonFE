/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import styled from "styled-components";

import { getMyPageData } from "@/apis/MyPage";
import backArrow from "@/assets/mypage/backArrow.svg";
import { MainTab } from "@/components/MyPageMobile/MainTab";
import { MyPageRetrospectMobile } from "@/components/MyPageMobile/MyPageRetrospectMobile";
import { ProfileSettingMobile } from "@/components/MyPageMobile/ProfileSettingMobile";
import { SecuritySettingMobile } from "@/components/MyPageMobile/SecuritySettingMobile";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { myPageProps } from "@/types";

export const MyPageMobile = () => {
  const [myData, setMyData] = useState<myPageProps>();
  const [activeCategory, setActiveCategory] = useState<string | null>("");
  const executeAsyncTask = useAsyncWithLoading();

  const MyPageRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await Promise.all([
          getMyPageData(localStorage.getItem("organization") || ""),
        ]);
        setMyData(result[0]);
      } catch {
        throw new Error("shit");
      }
    });
  };
  useEffect(() => {
    MyPageRendering();
    const category = new URL(window.location.href).searchParams.get("category");
    setActiveCategory(category);
  }, []);

  return (
    <Container>
      <MyPageMobileHeader>
        <img
          src={backArrow}
          alt="<"
          onClick={() => {
            history.back();
            setActiveCategory("마이페이지");
          }} //뒤로가기
        />
        <p>{activeCategory}</p>
      </MyPageMobileHeader>
      {activeCategory === "마이페이지" ? (
        <MainTab
          myData={myData}
          setActiveCategory={setActiveCategory}
        />
      ) : activeCategory === "프로필 설정" ? (
        <ProfileSettingMobile myData={myData} />
      ) : activeCategory === "보안 설정" ? (
        <SecuritySettingMobile />
      ) : activeCategory === "작성한 회고" ? (
        <MyPageRetrospectMobile />
      ) : (
        <div className="ready">아직 준비 중입니다.</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  .ready {
    margin: 50px 0;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
    color: var(--Gray-100, #212121);
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const MyPageMobileHeader = styled.div`
  height: 60px;
  padding: 10px 58px 10px 8px;
  display: flex;
  align-items: center;
  img {
    padding-left: 8px;
    cursor: pointer;
  }
  p {
    color: var(--Gray-100, #212121);
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
  }
`;
