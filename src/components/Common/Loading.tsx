import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingBox>
        <ClipLoader
          color="#6272ff"
          size={100}
        />
        {/* <p>잠시만 기다려주세요.</p> */}
      </LoadingBox>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background: rgba(21, 21, 21, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999;
`;
const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.3rem;
  font-weight: 900;
  position: absolute;
  left: 0;
  right: 0;
  margin: 45px auto 0;
  z-index: 9;
  color: var(--White, #fff);
  //background: rgba(21, 21, 21, 0.7);
  span {
    border-width: 12px !important;
  }
`;
