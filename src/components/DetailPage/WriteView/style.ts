import styled from "styled-components";

export const Container = styled.div`
  color: var(--Gray-100, #1b1d1f);

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-weight: 600;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--Gray-30, #edeef1);
  }
  .top .option {
    cursor: pointer;
  }
  .top .editBox {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 34px;
    display: flex;
    align-items: center;
    gap: 85px;
    padding: 8px 16px;
    border-radius: 6px;
    background: var(--White, #fff);
    box-shadow: 0px 4px 16px 0px rgba(33, 33, 33, 0.24);
    p {
      color: var(--Gray-80, #464c52);
      font-size: 0.875rem;
      line-height: 120%; /* 16.8px */
      margin-top: 3px;
    }
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
    white-space: pre-wrap;
  }
`;
