import styled from "styled-components";

export const Container = styled.div`
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px;
  cursor: pointer;
`;

export const PreviewBody = styled.div`
  margin-bottom: 10px;
  height: 215px;
  overflow-y: hidden;
  .previewItem {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; // 얘네를 추가히준다
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin-bottom: 1.25rem;
  }
  color: var(--Gray-90, #2c2f32);
  font-size: 0.875rem;
  line-height: 160%;
  .question {
    font-weight: 600;
  }
  .content {
    font-weight: 400;
    white-space: pre-wrap;
  }
`;
export const PreviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--Gray-30, #edeef1);
  padding-top: 16px;
`;
