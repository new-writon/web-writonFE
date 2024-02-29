import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 60px);
`;

export const Top = styled.div`
  padding: 0 20px;
  .topWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 11px;
    border-bottom: 1px solid var(--Gray-30, #eee);
  }
  .profileImageCover {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--Gray-30, #eee);
    border: 1px solid var(--Gray-40, #d9d9d9);
  }
  .profileImageCover img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
  .etc {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }
  .etc .nickname {
    color: var(--Gray-100, #212121);
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
  .etc .email {
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
`;

export const Bottom = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    display: flex;
    align-items: center;
    padding: 12.5px 20px;
    img {
      margin-right: 20px;
    }
    p {
      color: var(--Gray-100, #212121);
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 150%; /* 24px */
      padding-top: 5px;
    }
  }
  .category {
    padding: 12px 20px;
    color: var(--Gray-80, #616161);
    font-size: 1rem;
    font-weight: 500;
    line-height: 150%; /* 24px */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .category img {
    transform: rotate(180deg);
  }
  .category:not(.active):hover {
    background: var(--Gray-10, #fafafa);
  }
  .active {
    background: var(--Purple-0, #f8f8ff);
    color: var(--purple-50, #6a63f5);
    font-weight: 600;
    cursor: auto;
  }
  .line {
    width: 90%;
    height: 1px;
    margin: 0 auto;
    padding: 0 20px;
    background: var(--Gray-30, #eee);
  }
`;
