import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .profileImageCover {
    width: 34px;
    height: 34px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #eee);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }
  .user {
    margin-top: 2px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
  }
  .user .name {
    color: var(--Gray-100, #212121);
  }
  .user .bottom {
    display: flex;
    gap: 6px;
  }
  .user .bottom div {
    color: var(--Gray-70, #757575);
  }
  .user .bottom .date {
    color: var(--Gray-50, #bdbdbd);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 130%;
  }

  .user .bottom .job {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .user .bottom .job::after {
    content: "";
    display: block;
    width: 1px;
    height: 10px;
    background-color: #d9d9d9;
    margin-bottom: 2px;
  }
`;
