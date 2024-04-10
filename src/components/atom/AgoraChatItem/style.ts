import styled from "styled-components";

export const OtherContainer = styled.div<{ $type: string | undefined }>`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  gap: 8px;
  .profileImageCover {
    width: 24px;
    height: 24px;
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
  }

  .chat-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: calc(100% - 100px);
  }
  .chat-box .nickname {
    color: var(--Gray-80, #464c52);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 14.4px */
  }
  .chat-box .chat {
    width: 100%;
    padding: 13px 20px 11px;
    border-radius: 32px;
    background: ${(props) =>
      props.$type === "topic"
        ? "var(--brand-color-blue-50-main, #6272ff)"
        : " var(--Gray-30, #EDEEF1)"};
    color: ${(props) =>
      props.$type === "topic" ? "var(--White, #fff)" : " var(--Gray-100, #1b1d1f)"};
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .time {
    display: flex;
    align-items: flex-end;
    color: var(--Gray-50, #b1b4bc);
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 13px */
  }

  @media (max-width: 530px) {
    .chat-box {
      max-width: calc(100% - 85px);
    }
  }
`;

export const MyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  .chat-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: calc(100% - 100px);
  }
  .chat-box .nickname {
    display: flex;
    justify-content: flex-end;
    color: var(--Gray-80, #464c52);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 14.4px */
  }
  .chat-box .chat {
    width: 100%;
    padding: 13px 20px 11px;
    border-radius: 32px;
    background: var(--Brand-Color_Blue-10, #eff1ff);
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .time {
    display: flex;
    align-items: flex-end;
    color: var(--Gray-50, #b1b4bc);
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 13px */
  }
  @media (max-width: 530px) {
    .chat-box {
      max-width: calc(100% - 85px);
    }
  }
`;
