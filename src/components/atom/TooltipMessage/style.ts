import styled from "styled-components";

export const Container = styled.div<{ $direction: string; $page: string }>`
  z-index: 9999;
  padding: 16px 10px 12px;
  border-radius: 10px;
  background-color: var(--Gray-20);
  position: relative;
  border: 1px solid var(--Gray-40, #d2d5db);
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
        : props.$direction === "right"
          ? "rotate(-135deg)"
          : "rotate(-45deg)"}; // 여기 바꿔주면 된다. 화살표 방향
    position: absolute;
    top: ${(props) =>
      props.$direction === "left" ? "0" : props.$direction === "right" ? "0" : ""};
    bottom: ${(props) =>
      props.$direction === "left" ? "0" : props.$direction === "right" ? "0" : "-9px"};
    margin: auto;
    left: ${(props) =>
      props.$direction === "left" ? "-9px" : props.$direction === "right" ? "" : "0"};
    right: ${(props) =>
      props.$direction === "left" ? "" : props.$direction === "right" ? "-9px" : "0"};
    background-color: var(--Gray-20);
    border-bottom-left-radius: 3px;
    border-left: 1px solid var(--Gray-40, #d2d5db);
    border-bottom: 1px solid var(--Gray-40, #d2d5db);
  }
  img {
    width: 24px;
    height: fit-content;
    cursor: pointer;
  }
  .messageBox {
    color: var(--Gray-80, #464c52);
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
    background-color: var(--Gray-80, #464c52);
  }

  @media (max-width: 890px) {
    width: ${(props) => (props.$direction === "right" ? "auto" : "70%")};
    min-width: ${(props) => (props.$direction === "right" ? "auto" : " 365px")};
  }
  @media (max-width: 700px) {
    min-width: ${(props) => (props.$direction === "right" ? "auto" : "300px")};
    padding: 16px 10px 16px;
    img {
      display: ${(props) => (props.$direction === "right" ? "block" : " none")};
    }
    &::before {
      display: ${(props) => (props.$direction === "right" ? "none" : "block")};
      transform: ${(props) =>
        props.$page === "writing"
          ? " rotate(135deg)"
          : " rotate(-45deg)"}; // 여기 바꿔주면 된다. 화살표 방향
      position: absolute;
      top: ${(props) => (props.$page === "writing" ? " -10px" : " 192px")};
      margin: 0 auto;
      left: 0;
      right: ${(props) => (props.$page === "writing" ? " 70px" : " 90px")};
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
