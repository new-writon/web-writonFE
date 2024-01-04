import styled from "styled-components";

import Register from "@/components/Authorization/RegisterPage";

const RegisterPage = () => {
  return (
    <Container>
      <Register />
    </Container>
  );
};

export default RegisterPage;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.5rem;
`;
