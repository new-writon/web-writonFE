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
  background-color: var(--Gray-20, #f8f8fa);
  padding-bottom: 176px;
`;
