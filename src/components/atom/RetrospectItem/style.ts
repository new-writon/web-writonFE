import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 16px;
  background: var(--White);
  padding: 26px;
  cursor: pointer;

  @media (min-width: 531px) {
    overflow-y: hidden;
    &:hover {
      box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
      margin-top: -5px;
    }
  }
  @media (max-width: 530px) {
    padding: 15px;
    height: 174px;
    width: 55%;
  }
`;

export const Title = styled.div`
  color: var(--Gray-100, #1b1d1f);
  font-size: 1rem;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--Gray-30, #edeef1);
  padding-bottom: 11px;
  .mainTitle {
    padding-top: 4px;
  }
  @media (max-width: 530px) {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const PreviewBody = styled.div`
  font-size: 0.875rem;
  line-height: 22.4px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  .previewItem {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; // 얘네를 추가히준다
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .question {
    color: var(--Gray-70, #73777e);
    font-weight: 600;
  }
  .content {
    color: var(--Gray-70, #73777e);
    font-weight: 400;
    white-space: pre-wrap;
  }
  @media (max-width: 530px) {
    .content {
      line-height: 25px;
      white-space: pre-wrap;
    }
  }
`;
