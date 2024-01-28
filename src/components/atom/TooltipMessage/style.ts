import styled from "styled-components";

export const Container = styled.div<{ $direction: string }>`
  z-index: 9999;
  padding: 16px 10px 12px;
  border-radius: 10px;
  background-color: var(--Gray-20);
  position: relative;
  border: 1px solid var(--Gray-40);
  display: flex;
  gap: 10px;
  max-width: 100%;
  will-change: filter;
  filter: drop-shadow(0px 4px 20px rgba(33, 33, 33, 0.1));

  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: ${(props) =>
      props.$direction === "left"
        ? "rotate(45deg)"
        : "rotate(-45deg)"}; // 여기 바꿔주면 된다. 화살표 방향
    position: absolute;
    top: ${(props) => (props.$direction === "left" ? "0" : "")};
    bottom: ${(props) => (props.$direction === "left" ? "0" : "-9px")};
    margin: auto;
    left: ${(props) => (props.$direction === "left" ? "-9px" : "0")};
    right: ${(props) => (props.$direction === "left" ? "" : "0")};
    background-color: var(--Gray-20);
    border-bottom-left-radius: 3px;
    border-left: 1px solid var(--Gray-40);
    border-bottom: 1px solid var(--Gray-40);
  }
  img {
    width: 24px;
    height: fit-content;
    cursor: pointer;
  }
  .messageBox {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 160%;
  }
  .messageBox ol li {
    display: flex;
    align-items: center;
  }
  .messageBox ol li::before {
    content: "";
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    margin: 0 10px;
    background-color: var(--Gray-80, #616161);
  }

  @media (max-width: 890px) {
    width: 70%;
    min-width: 365px;
  }
  @media (max-width: 700px) {
    min-width: 300px;
    padding: 16px 10px 16px;
    img {
      display: none;
    }
    &::before {
      transform: rotate(-45deg); // 여기 바꿔주면 된다. 화살표 방향
      position: absolute;
      top: 181px;
      margin: 0 auto;
      left: 0;
      right: 80px;
    }
  }
  @media (max-width: 355px) {
    &::before {
      transform: rotate(-45deg); // 여기 바꿔주면 된다. 화살표 방향
      position: absolute;
      top: 140px;
      margin: 0 auto;
      left: 0;
      right: 58px;
    }
  }
`;
