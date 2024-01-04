import { useRecoilValue } from "recoil";
import styled from "styled-components";

import RegisterEmail from "@/components/Authorization/RegisterEmailPage";
import { DetailAgree } from "@/components/Authorization/RegisterEmailPage/DetailAgree";
import Loading from "@/components/Common/Loading";
import { agreeTextState, loadingState } from "@/recoil/atoms";

const RegisterEmailPage = () => {
  const loading = useRecoilValue(loadingState);
  const agreeTextNum = useRecoilValue(agreeTextState);
  return (
    <Container>
      {loading && (
        <Background>
          <Loading />
        </Background>
      )}
      {agreeTextNum !== -1 && (
        <Background>
          <DetailAgree />
        </Background>
      )}
      <RegisterEmail />
    </Container>
  );
};

export default RegisterEmailPage;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(21, 21, 21, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`;
