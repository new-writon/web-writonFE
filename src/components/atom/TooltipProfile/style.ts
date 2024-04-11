import styled from "styled-components";

export const BackDrop = styled.div<{ $headerTooltip: boolean }>`
  @media (min-width: 530px) {
    display: none;
  }
  display: ${(props) => (props.$headerTooltip ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const Container = styled.div<{ $headerTooltip: boolean; $TooltipMobile: boolean }>`
  min-width: 300px;
  position: absolute;
  top: 71px;
  right: 0;
  border-radius: 16px;
  border: 1px solid var(--Gray-30, #edeef1);
  background: var(--White, #fff);
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  padding: 26px 16px;
  z-index: 99999;
  @media (max-width: 530px) {
    display: ${(props) => (props.$headerTooltip ? "block" : "none")};
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 272px;
    position: absolute;
    top: 0;
    right: -320px;
    border-radius: 0;
    transition: transform 0.6s ease-in-out;
    transform: ${(props) => (props.$TooltipMobile ? "translateX(-304px)" : "translateX(0)")};
    /* ${(props) =>
      props.$headerTooltip
        ? `
      display: block;
      transition-delay: 3s;
      transform: translateX(-304px);
    `
        : "transform: translateX(0);"} */
  }
  .line {
    height: 1px;
    width: calc(100% - 20px);
    background-color: var(--Gray-30, #edeef1);
    margin: 0 auto;
  }
  .logout {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    text-decoration-line: underline;
    width: fit-content;
    margin: 0 auto;
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
  padding: 0 10px 12px;
  align-items: center;
  gap: 12px;
  .profileImageCover {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #edeef1);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
  .nickname {
    color: var(--Gray-100, #1b1d1f);
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
  .email {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    line-height: 160%; /* 22.4px */
  }
`;

export const Middle = styled.div`
  padding: 20px 10px;
  .userAddInfo {
    display: flex;
    gap: 6px;
  }
  .userAddInfo .job,
  .userAddInfo .company {
    display: flex;
    color: var(--Main-50, #6272ff) !important;
    font-size: 0.875rem;
    font-weight: 600;
    gap: 6px;
    line-height: 160%;
    align-items: center;
  }
  .userAddInfo .company.none::before {
    display: none;
  }
  .userAddInfo .company::before {
    content: "";
    display: block;
    width: 1px;
    height: 10px;
    background-color: var(--Gray-40, #d2d5db);
  }
  .oneline {
    margin-top: 4px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 160%;
    overflow-wrap: break-word;
  }
`;

export const Bottom = styled.div`
  padding: 24px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .currentChallengeTitle,
  .pastChallengeTitle {
    color: var(--Gray-60, #94989f);
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 120%; /* 14.4px */
    padding-bottom: 4px;
    padding: 0 10px;
  }
`;

export const MypageBtn = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--Gray-40, #d2d5db);
  background: var(--White, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 4px;
  color: var(--Gray-80, #464c52);
  text-align: center;
  font-size: 0.875rem;
  line-height: 120%; /* 16.8px */
  cursor: pointer;
  margin-bottom: 16px;
  img {
    padding-bottom: 2px;
  }
`;
