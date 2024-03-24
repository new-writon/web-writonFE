import styled from "styled-components";

export const Container = styled.div<{ $click: boolean }>`
  width: 100%;
  max-height: 85px;
  display: flex;
  gap: 10px;
  border-top: 1px solid var(--Gray-30, #eee);
  padding: 16px 0 20px;
  cursor: pointer;
  background-color: ${(props) => props.$click && "#FCFCFC"};
  &:hover {
    background-color: var(--Gray-20, #f8f8fa);
  }

  img,
  .notification-title,
  .comment-text,
  .date {
    opacity: ${(props) => props.$click && "0.4"};
  }
`;

export const First = styled.div``;
export const Second = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .notification-title {
    display: flex;
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    line-height: 160%;
    font-weight: 500;
  }
  .title .data {
    color: var(--Gray-100, #212121);
    line-height: 160%;
    font-weight: 600;
  }
  .comment-text {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    line-height: 130%; /* 15.6px */
    overflow-x: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;
export const Third = styled.div`
  .date {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    line-height: 130%; /* 15.6px */
  }
`;

export const ContainerMobile = styled.div<{ $click: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--Gray-30, #eee);
  padding: 16px 20px;
  cursor: pointer;
  background-color: ${(props) => props.$click && "#FCFCFC"};

  .first,
  .second {
    opacity: ${(props) => props.$click && "0.4"};
  }
  &:hover {
    background: var(--Gray-20, #f5f5f5);
  }
  .second {
    gap: 4px;
    display: flex;
    flex-direction: column;
    .notification-title {
      display: flex;
      color: var(--Gray-80, #464c52);
      font-size: 0.875rem;
      line-height: 160%;
      font-weight: 500;
    }
    .title .data {
      color: var(--Gray-100, #212121);
      line-height: 130%; /* 15.6px */
      font-weight: 600;
    }
    .comment-text {
      color: var(--Gray-60, #959595);
      font-size: 0.75rem;
      line-height: 130%; /* 15.6px */
      overflow-x: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .date {
      color: var(--Gray-60, #959595);
      font-size: 0.75rem;
      line-height: 130%; /* 15.6px */
    }
  }
`;
