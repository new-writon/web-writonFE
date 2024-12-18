import styled from "styled-components";

export const Container = styled.div<{ $someone: string; $message: string | null | undefined }>`
  display: flex;
  flex-direction: column;
  width: 88px;
  min-width: 83px;
  max-width: 88px;
  align-items: center;
  font-size: var(--text_cap1);
  line-height: 130%;
  color: var(--Gray-100, #1b1d1f);
  position: relative;
  justify-content: flex-end;
  .profileBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .storyMessage {
    width: 100%;
    padding: 10px 6px;
    border-radius: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    z-index: 1;
    height: 42px;
    color: ${(props) => (props.$someone === "me" ? " var(--White)" : " var(--Gray-100, #1b1d1f)")};
    background-color: ${(props) =>
      props.$someone === "me" ? "var(--Gray-70, #73777e)" : "var(--Gray-20, #f8f8fa)"};
    opacity: ${(props) => (props.$someone === "me" ? 1 : props.$message !== null ? 1 : 0)};
    cursor: pointer;
    text-align: center;
    line-height: 110%;
  }
  .storyMessage::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    position: absolute;
    bottom: -3px;
    margin: auto;
    left: 0;
    right: 0;
    background-color: ${(props) =>
      props.$someone === "me" ? "var(--Gray-70, #73777e)" : "var(--Gray-20, #f8f8fa)"};
    border-bottom-left-radius: 3px;
    z-index: -1;
  }
  @media (max-width: 530px) {
    .storyMessage::before {
      background-color: var(--White, #fff);
    }
    .storyMessage {
      background-color: var(--White, #fff);
      font-size: 10px;
      color: var(--Gray-90, #2c2f32);
      justify-content: flex-start;
      padding: 10px;
      white-space: ${(props) => (props.$message !== null ? "pre-wrap" : "wrap")};
      height: auto;
      width: fit-content;
      max-width: fit-content;
    }
  }

  .profileImageCover {
    width: 58px;
    height: 58px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    background-color: var(--White, #fff);
    border: ${(props) =>
      props.$someone === "me" ? "3px solid transparent" : "1px solid var(--Gray-30, #edeef1)"};
    background: ${(props) =>
      props.$someone === "me" && "linear-gradient(0deg,#D5ABFF 0%, #6272ff 100%)"};
    background: ${(props) =>
      props.$someone === "me" && "-webkit-linear-gradient(0deg,#D5ABFF 0%, #6272ff 100%)"};
    background-origin: border-box;
    box-shadow: ${(props) =>
      props.$someone === "me" && "0px 8px 15px 0px rgba(124, 128, 137, 0.10)"};
    cursor: pointer;
  }

  .profileImageCover img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
  .company {
    color: var(--Gray-70, #73777e);
  }
`;
