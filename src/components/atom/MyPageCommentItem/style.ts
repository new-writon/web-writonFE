import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--Gray-30, #eee);
  padding: 16px 0 20px;
  cursor: pointer;
  &:hover {
    .text {
      text-decoration-line: underline;
    }
  }
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .date {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    line-height: 130%; /* 15.6px */
  }
  .text {
    max-width: 560px;
    color: var(--Gray-100, #212121);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.875rem;
    line-height: 160%; /* 22.4px */
  }
`;

export const Bottom = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
  .writing,
  .userName {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .writing .title,
  .userName .title {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    display: flex;
    gap: 6px;
  }
  .title::after {
    content: "";
    width: 1px;
    height: 15px;
    background: var(--Gray-30, #eee);
    display: block;
  }
  .writing .sentence,
  .userName .sentence {
    color: var(--Gray-80, #616161);
    font-size: 0.75rem;
  }
`;

export const ContainerMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--Gray-30, #eee);
  padding: 16px 20px;
  cursor: pointer;
  &:hover {
    background: var(--Gray-20, #f5f5f5);
  }

  .text {
    width: 100%;
    color: var(--Gray-100, #212121);
    font-size: 14px;
    line-height: 160%; /* 22.4px */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date {
    color: var(--Gray-60, #959595);
    font-size: 0.75rem;
    line-height: 150%; /* 18px */
  }
  .bottom {
    display: flex;
    gap: 10px;
    font-size: 0.75rem;
    .writing,
    .userName {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .writing .title,
    .userName .title {
      color: var(--Gray-60, #959595);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .title::after {
      content: "";
      width: 1px;
      height: 15px;
      background: var(--Gray-30, #eee);
      display: block;
    }
    .writing .sentence,
    .userName .sentence {
      color: var(--Gray-80, #616161);
      font-size: 0.75rem;
    }
  }
`;
