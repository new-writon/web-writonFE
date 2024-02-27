/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { getMyPageData } from "@/apis/MyPage";
import { MyPageRetrospect } from "@/components/MyPage/MyPageRetrospect";
import { ProfileSetting } from "@/components/MyPage/ProfileSetting";
import { SecuritySetting } from "@/components/MyPage/SecuritySetting";
import { SideTab } from "@/components/MyPage/SideTab";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { accountNumberState } from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { myPageProps } from "@/types";

export const MyPage = () => {
  const [myData, setMyData] = useState<myPageProps>();
  const executeAsyncTask = useAsyncWithLoading();
  const [activeCategory, setActiveCategory] = useState<string | null>("");
  const accountNumberModal = useRecoilValue(accountNumberState);

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
  }, [accountNumberModal]);

  return (
    <Inner>
      <Container>
        <MainSemiTitle font={1.5}>마이페이지</MainSemiTitle>
        <div className="mypageBox">
          <SideTab
            myData={myData}
            setActiveCategory={setActiveCategory}
          ></SideTab>
          {activeCategory === "프로필 설정" ? (
            <ProfileSetting myData={myData} />
          ) : activeCategory === "보안 설정" ? (
            <SecuritySetting />
          ) : activeCategory === "작성한 회고" ? (
            <MyPageRetrospect />
          ) : (
            <div className="ready">아직 준비 중입니다.</div>
          )}
        </div>
      </Container>
    </Inner>
  );
};

const Container = styled.div`
  position: relative;
  padding-top: 44px;
  .mypageBox {
    margin-top: 16px;
    display: flex;
    gap: 18px;
    min-width: 930px;
  }
  .ready {
    width: 100%;
    color: var(--Gray-80, #616161);
    font-size: 1.15rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
