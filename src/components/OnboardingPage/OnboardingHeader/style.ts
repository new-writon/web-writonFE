import styled from "styled-components";

export const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  height: 71px;
  display: flex;
  justify-content: space-between;
  .icons {
    display: flex;
    align-items: center;
    gap: 17px;
    img:nth-of-type(1) {
      width: 42px;
      height: 42px;
      cursor: pointer;
    }
    img:nth-of-type(2) {
      width: 90px;
      height: fit-content;
      cursor: pointer;
    }
    @media (max-width: 530px) {
      gap: 10px;
      img:nth-of-type(1) {
        width: 32px;
        height: 32px;
      }
      img:nth-of-type(2) {
        width: 66px;
        height: fit-content;
      }
    }
  }
`;
