import styled from "styled-components";

export const RenderDays = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <Container>
      {days.map((item) => (
        <div>{item}</div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
