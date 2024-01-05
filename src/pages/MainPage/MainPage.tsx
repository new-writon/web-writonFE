import styled from "styled-components";

import { ProgressBox } from "@/components/MainPage/ProgressBox";

const MainPage = () => {
  return (
    <Container>
      <ProgressBox />
      <div>나의 회고 몰아보기</div>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
`;
