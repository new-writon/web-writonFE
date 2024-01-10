import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Calendar } from "@/components/MainPage/Calendar";
import { MyRetrospect } from "@/components/MainPage/MyRetrospect";
import { ProgressBox } from "@/components/MainPage/ProgressBox";
import { FloatingWriteButton } from "@/components/atom/button";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ProgressBox />
      <Calendar />
      <MyRetrospect />
      <FloatingWriteButton onClick={() => navigate("/writepage")}>
        {/*모바일 일 때만 보인다/ */}
        회고 작성하기
      </FloatingWriteButton>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
  position: relative;
`;
