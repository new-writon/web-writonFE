import styled from "styled-components";

import { CommunityBox } from "@/components/CommunityPage/CommunityBox";
import { StoryBox } from "@/components/CommunityPage/StoryBox";

export const CommunityPage = () => {
  return (
    <Container>
      <StoryBox></StoryBox>
      <CommunityBox></CommunityBox>
    </Container>
  );
};
const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
  position: relative;
`;
