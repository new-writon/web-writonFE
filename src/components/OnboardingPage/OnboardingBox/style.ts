import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 711px;
  background-color: var(--White);
  margin: 37px auto 0;
  border-radius: 16px;
  background: var(--White, #fff);
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
  padding: 50px 170px 100px;
  @media (max-width: 710px) {
    padding: 50px 20px 100px;
    min-width: 340px;
  }
  @media (max-width: 530px) {
    margin: 0 auto;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 50px;
  .firstTitle {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .firstTitle img {
    width: 42px;
    height: 42px;
  }
  .semiTitle {
    color: var(--Gray-70, #73777e);
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
  .secondTitle {
    color: var(--Gray-100, #1b1d1f);
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 130%; /* 31.2px */
  }
`;

export const OnboardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .error {
    color: var(--Error_50, #dc362e);
  }
  .success {
    color: var(--Main-60, #5161ed);
  }
  .dupliBtn {
    color: var(--Gray-60, #94989f);
  }
  .title {
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%;
  }
  .semiTitle {
    color: var(--Gray-70, #73777e);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 130%; /* 15.6px */
    margin-top: 6px;
  }
  .parityCheck {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    p {
      font-size: 0.75rem;
    }
  }
  .numCheck {
    font-size: 0.8rem;
  }
  input {
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--Gray-10, #fcfcfc);
  }
`;

export const NicknameBox = styled.div`
  .inputNickname {
    position: relative;
    margin: 6px 0;
  }
`;

export const JobBox = styled.div`
  .jobCategory {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
`;

export const JobIntroBox = styled.div`
  margin-top: 20px;
  textarea {
    margin-top: 6px;
    width: 100%;
    height: 104px;
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--Gray-10, #fcfcfc);
    outline: none;
    padding: 16px;
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    caret-color: var(--Main-50, #6272ff);
    color: var(--Gray-100, #1b1d1f);
    line-height: 24px;
    overflow-y: hidden;
    &::placeholder {
      color: var(--Gray-60, #94989f);
      font-size: 1rem;
      line-height: 150%; /* 24px */
      white-space: pre-wrap;
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;

export const CompanyBox = styled.div`
  .topTitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

export const JoinDateBox = styled.div`
  .semiTitle {
    margin-bottom: 16px;
  }
  input {
    margin-bottom: 30px;
  }
`;

export const CalendarButton = styled.div`
  position: absolute;
  top: 27px;
  bottom: 0;
  right: 18px;
  margin: auto 0;
  display: flex;
  img {
    margin: auto 0;
    cursor: pointer;
  }
`;

export const Calendar = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 1;
`;
