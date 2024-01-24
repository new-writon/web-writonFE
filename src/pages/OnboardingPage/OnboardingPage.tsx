import styled from "styled-components";

import { OnboardingBox } from "@/components/OnboardingPage/OnboardingBox";
import { OnboardingHeader } from "@/components/OnboardingPage/OnboardingHeader";

export const OnboardingPage = () => {
  return (
    <Container>
      <OnboardingHeader />
      <OnboardingBox />
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--Gray2_100, #f5f5f5);
  padding-bottom: 176px;
`;
