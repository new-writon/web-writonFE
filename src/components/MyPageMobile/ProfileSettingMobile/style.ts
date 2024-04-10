import styled from "styled-components";

export const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 60px);

  .title {
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
    padding: 12.5px 20px;
  }
  .editField {
    display: flex;
    padding: 16px 20px;
    gap: 10px;
    max-width: 100%;
    align-items: center;
  }
  .editTitle {
    color: var(--Gray-60, #94989f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    min-width: 80px;
    white-space: pre-wrap;
  }
  .editText {
    gap: 10px;
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .editText.account {
    color: var(--Gray-60, #94989f);
    position: relative;
  }
  .companyedit {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .companyedit .text {
    margin-top: 3px;
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .editJob {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .editEmail {
    color: var(--Gray-60, #94989f);
  }
  .line {
    width: 90%;
    height: 1px;
    margin: 60px auto 16px;
    padding: 0 20px;
    background: var(--Gray-30, #edeef1);
  }
  .editBtnWrapper {
    padding: 0 20px;
    position: absolute;
    bottom: 50px;
    width: 100%;
  }
  .editBtn {
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    cursor: pointer;
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
`;

export const AccountButton = styled.div`
  padding: 9px 12px 7px;
  border-radius: 10px;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  position: absolute;
  top: 26px;
  cursor: pointer;
  background: var(--Purple-10, #f0efff);
  color: var(--purple-50, #6a63f5);
  &:hover {
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
`;

export const BasicSetting = styled.div`
  background: var(--White, #fff);
`;

export const ChallengeSetting = styled.div`
  background: var(--White, #fff);
  .jobField {
    max-width: 480px;
    .editJob {
      width: max-content;
      display: flex;
      gap: 8px;
    }
  }
  .jobIntroduceField {
    align-items: flex-start;
  }
  textarea {
    width: 100%;
    height: 104px;
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--White, #ffff);
    outline: none;
    padding: 16px;
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    caret-color: #6a63f5;
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
export const EditBox = styled.div`
  width: 100%;
  position: relative;
  .inputNickname {
  }
  .error {
    color: var(--Error_50, #dc362e);
  }
  .success {
    color: var(--purple-50, #6a63f5);
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
  .parityCheck {
    width: 100%;
    position: absolute;
    margin-top: 6px;
    display: flex;
    font-size: 0.75rem;
    p {
      font-size: 0.75rem;
    }
  }
  .textCheck {
    position: absolute;
    left: 0;
  }
  .numCheck {
    position: absolute;
    right: 0;
    font-size: 0.75rem;
    color: var(--Gray-60, #94989f);
  }
  input {
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--White, #ffff);
  }
`;

export const DuplicateBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 0.875rem;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 16px;
  color: var(--Shadow_Blue, #135ff3);
  cursor: pointer;
`;

export const EditButton = styled.div`
  background-color: var(--White, #fff);
  padding: 40px 20px 40px;
  width: 100%;
  display: flex;
  gap: 10px;
  div {
    width: 50%;
    text-align: center;
    padding: 16px 0;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
    cursor: pointer;
  }
  .editCloseBtn {
    background: var(--Purple-10, #f0efff);
    color: var(--purple-50, #6a63f5);
  }
  .editCompleteBtn {
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
`;
