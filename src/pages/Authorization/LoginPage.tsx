import styled from "styled-components";

import Login from "@/components/Authorization/LoginPage";

const LoginPage = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.5rem;
`;
