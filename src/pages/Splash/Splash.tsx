import styled from "styled-components";
import writon_logo from "@/assets/logo/writon.svg";

const Splash = () => {
  return (
    <Container>
      <img
        src={writon_logo}
        alt="writon"
      />
    </Container>
  );
};

export default Splash;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 6.5rem;
  }
`;
