import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .replyBox {
    margin-left: 46px;
  }
  textarea {
    max-width: 497px;
  }

  .comment-text {
    max-width: 543px;
    word-wrap: break-word;
    margin-left: 46px;
    padding: 16px 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--Gray-100, #212121);
    white-space: pre-wrap;
    line-height: 150%;
  }

  .reply {
    display: flex;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 120%; /* 14.4px */
    gap: 8px;
  }
  .replyBox div:has(textarea) {
    margin: 29px 0;
  }

  .reply div {
    color: var(--Gray-60, #959595);
    display: flex;
    gap: 8px;
    cursor: pointer;
    font-size: 0.75rem;
  }
  .reply .replyRead::before {
    content: "";
    display: block;
    width: 1px;
    height: 10px;
    background-color: #d9d9d9;
    margin-bottom: 2px;
  }

  .replylist {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
`;
