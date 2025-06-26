import { useSetRecoilState } from "recoil";

import { errorState } from "@/recoil/atoms";

import styled from "styled-components";

export const ErrorModal = ({ errorMessage }: { errorMessage: string }) => {
  const setErrorMessage = useSetRecoilState(errorState);

  const handleClick = () => {
    setErrorMessage("");

    if (
      errorMessage === "Internal server error" ||
      errorMessage === "유저 챌린지가 존재하지 않습니다."
    ) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/login");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Text>
          <Text_Bold>{errorMessage}</Text_Bold>
        </Text>
        <Buttons>
          <Button
            $type={true}
            onClick={handleClick}
          >
            닫기
          </Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

const Container = styled.div`
  background-color: var(--White, #fff);
  border-radius: 12px;
  padding: 24px;
  max-height: fit-content;
  display: flex;
  gap: 32px;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 400px;

  @media (min-width: 531px) {
    width: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Text_Bold = styled.span`
  color: var(--Gray-100, #212121);
  font-size: 18px;
  font-weight: 700;
  line-height: 150%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.div<{ $type: boolean }>`
  background-color: ${({ $type }) => ($type ? "var(--Main-50, #6272FF)" : "var(--White, #fff)")};
  color: ${({ $type }) => ($type ? "var(--White, #fff)" : "var(--Gray-90, #2C2F32)")};
  border: ${({ $type }) =>
    $type ? "1px solid var(--Main-50, #6272FF);" : "1px solid var(--Gray-40, #d2d5db);"};
  border-radius: 10px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;
