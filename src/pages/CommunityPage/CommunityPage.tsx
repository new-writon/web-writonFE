/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import styled from "styled-components";

import { getCommunityFirstComponent, getMyCommunityStory } from "@/apis/CommunityPage";
import { getChallengeCurrent } from "@/apis/mainPage";
import { AgoraBox } from "@/components/CommunityPage/AgoraBox";
import { CommunityBox } from "@/components/CommunityPage/CommunityBox";
import { StoryBox } from "@/components/CommunityPage/StoryBox";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { ChallengeCurrentType, communityFirstComponentType, communityStoryProps } from "@/types";

export const CommunityPage = () => {
  const [ChallengeCurrent, setChallengeCurrent] = useState<ChallengeCurrentType>();
  const [CommunityFirstData, setCommunityFirstData] = useState<communityFirstComponentType>();
  const [myCommunityStoryData, setMyCommunityStoryData] = useState<communityStoryProps>();
  const executeAsyncTask = useAsyncWithLoading();

  const CommunityPageRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await Promise.all([
          getChallengeCurrent(
            localStorage.getItem("organization") || "",
            localStorage.getItem("challengeId") || "1"
          ),
          getCommunityFirstComponent(localStorage.getItem("challengeId") || "1"),
          getMyCommunityStory(localStorage.getItem("challengeId") || "1"),
        ]);
        setChallengeCurrent(result[0]);
        setCommunityFirstData(result[1]);
        setMyCommunityStoryData(result[2]);
      } catch {
        throw new Error("shit");
      }
    });
  };

  useEffect(() => {
    CommunityPageRendering();
  }, []);

  return (
    <Container>
      <StoryBox
        ChallengeCurrent={ChallengeCurrent}
        CommunityFirstData={CommunityFirstData}
        myCommunityStoryData={myCommunityStoryData}
      />
      <AgoraBox
        ChallengeCurrent={ChallengeCurrent}
        CommunityFirstData={CommunityFirstData}
      />
      <CommunityBox />
    </Container>
  );
};
const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
  padding-bottom: 230px;
  position: relative;
  @media (max-width: 530px) {
    padding-top: 0;
    padding-bottom: 50px;
  }
`;
