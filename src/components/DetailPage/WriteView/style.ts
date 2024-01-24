import styled from "styled-components";

export const Container = styled.div`
  color: var(--Gray-100, #212121);

  .date {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .specialQuestion {
    margin-top: 20px;
    padding-bottom: 17px;
  }
  .basicQuestion {
    margin-top: 20px;
  }
  .QuestionBox {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .title {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
    margin-bottom: 12px;
  }

  .content {
    font-size: 1rem;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
`;
