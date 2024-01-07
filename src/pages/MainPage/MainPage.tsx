import styled from "styled-components";

import { Calendar } from "@/components/MainPage/Calendar";
import { ProgressBox } from "@/components/MainPage/ProgressBox";

const MainPage = () => {
  return (
    <Container>
      <ProgressBox />
      <Calendar />
      efwfefw
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
`;
