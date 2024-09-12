import styled from "styled-components";

import { AgoraBox } from "@/components/CommunityPage/AgoraBox";
import { CommunityBox } from "@/components/CommunityPage/CommunityBox";

import {
  useGetChallengeCurrent,
  useGetCommunityChallengeStats,
} from "@/hooks/reactQueryHooks/useMainHooks";

const CommunityPage = () => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
  };

  const { data: ChallengeCurrent } = useGetChallengeCurrent(organizationChallengeData);
  const { data: CommunityStats } = useGetCommunityChallengeStats(
    localStorage.getItem("challengeId") as string
  );

  return (
    <Container>
      {/* <StoryBox
        ChallengeCurrent={ChallengeCurrent}
        CommunityFirstData={CommunityFirstData}
        myCommunityStoryData={myCommunityStoryData}
      /> */}
      <AgoraBox
        ChallengeCurrent={ChallengeCurrent}
        CommunityStats={CommunityStats}
      />
      <CommunityBox />
    </Container>
  );
};

export default CommunityPage;

const Container = styled.div`
  background: var(--Gray-20, #f8f8fa);
  padding-top: 23px;
  padding-bottom: 230px;
  position: relative;
  @media (max-width: 530px) {
    padding-top: 0;
    padding-bottom: 50px;
  }
`;
