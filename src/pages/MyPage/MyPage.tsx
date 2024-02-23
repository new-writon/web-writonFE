/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import styled from "styled-components";

import { getMyCommunityStory } from "@/apis/CommunityPage";
import { SideTab } from "@/components/MyPage/SideTab";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { Inner } from "@/style/global";
import { communityStoryProps } from "@/types";

export const MyPage = () => {
  const [myData, setMyData] = useState<communityStoryProps>();
  const executeAsyncTask = useAsyncWithLoading();
  const [activeCategory, setActiveCategory] = useState<string | null>("");
  const MyPageRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await Promise.all([
          getMyCommunityStory(localStorage.getItem("challengeId") || "1"),
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
    <Inner>
      <Container>
        <MainSemiTitle font={1.5}>마이페이지</MainSemiTitle>
        <div className="mypageBox">
          <SideTab
            myData={myData}
            setActiveCategory={setActiveCategory}
          ></SideTab>
          {activeCategory === "프로필 설정"
            ? "ㅎㅇㅎㅇㅎㅇ"
            : activeCategory === "보안 설정"
              ? "ㄷㄹㄷㄹㄷㄹ"
              : ""}
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
  }
`;
