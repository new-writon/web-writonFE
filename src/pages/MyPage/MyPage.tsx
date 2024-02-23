import styled from "styled-components";

import { SideTab } from "@/components/MyPage/SideTab";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { Inner } from "@/style/global";

export const MyPage = () => {
  return (
    <Inner>
      <Container>
        <MainSemiTitle font={1.5}>마이페이지</MainSemiTitle>
        <SideTab></SideTab>
      </Container>
    </Inner>
  );
};

const Container = styled.div`
  position: relative;
  padding-top: 44px;
`;
