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
    border: 1px solid var(--Gray-30, #edeef1);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }
  .user {
    margin-top: 2px;
  }
  .user .top {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .user .top .job {
    display: flex;
    align-items: center;
  }
  .user .top .company {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .user .top .company.hide::before {
    display: none;
  }
  .user .top .company::before {
    content: "";
    display: block;
    width: 1px;
    height: 10px;
    background-color: var(--Gray-40, #d2d5db);
    margin-bottom: 2px;
  }
  .user .top .company,
  .user .date {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%;
  }
  .user .date {
    font-weight: 500;
  }
`;
