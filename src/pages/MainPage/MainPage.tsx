import { useEffect, useState } from "react";

import { AnimatedLineProgressBar } from "@frogress/line";
import styled from "styled-components";

const MainPage = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setValue(70);
    }, 700);
  }, []);
  return (
    <Container>
      <AnimatedLineProgressBar
        percent={value}
        rounded={36}
        height={36}
        transition={{ easing: "easeInOut" }}
      />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  font-family: "Happiness-Sans-Bold";
`;
