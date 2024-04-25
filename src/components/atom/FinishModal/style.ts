import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 530px) {
    align-items: baseline;
    padding-top: 56px;
  }

  .finishWrapper {
    min-width: 520px;
    border-radius: 16px;
    background: var(--White, #fff);
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .finishBox {
    background: var(--White, #fff);
    backface-visibility: hidden;
    transition: 0.8s;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .finishBox.first-page {
    position: absolute;
    /* transform: rotateY(0deg); */
    padding: 50px 0;
    transform: translateX(0);
  }
  .finishBox.first-page.next {
    /* transform: rotateY(-180deg); */
    transform: translateX(-500px);
    visibility: hidden;
  }
  .finishBox.first-page.end {
    /* transform: rotateY(-180deg); */
    transform: translateX(-1000px);
    visibility: hidden;
  }
  .finishBox.second-page {
    position: absolute;
    /* transform: rotateY(180deg); */
    padding: 30px 30px 50px;
    transform: translateX(500px);
    visibility: hidden;
  }
  .finishBox.second-page.next {
    /* transform: rotateY(0deg); */
    transform: translateX(0);
    visibility: visible;
  }
  .finishBox.second-page.end {
    /* transform: rotateY(-180deg); */
    transform: translateX(-500px);
    visibility: hidden;
  }

  .finishBox.third-page {
    position: absolute;
    /* transform: rotateY(180deg); */
    padding: 30px 30px 50px;
    transform: translateX(1000px);
    visibility: hidden;
  }
  .finishBox.third-page.next {
    /* transform: rotateY(0deg); */
    transform: translateX(500px);
    visibility: hidden;
  }
  .finishBox.third-page.end {
    /* transform: rotateY(0deg); */
    transform: translateX(0);
    visibility: visible;
  }

  .challengeName {
    color: var(--Gray-60);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%;
    text-align: center;
    margin-bottom: 8px;
  }

  .title {
    color: var(--Gray-100, #1b1d1f);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 132%;
    text-align: center;
    margin-bottom: 20px;
  }
  .title.second {
    margin-top: 26px;
    margin-bottom: 30px;
  }

  .text.first {
    margin: 14px 0 30px;
    color: var(--Gray-80, #464c52);
    text-align: center;
    line-height: 160%;
  }
  .texts {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 14px 0 56px;
  }
  .texts .text {
    color: var(--Gray-80, #464c52);
    text-align: center;
    line-height: 160%;
  }
  .etcText {
    margin-bottom: 30px;
    color: var(--Gray-60, #94989f);
    text-align: center;
    font-size: 0.75rem;
    line-height: 130%;
  }
  .purple {
    display: inline;
    color: var(--Main-50, #6272ff);
    font-weight: 700;
  }
  .highlight {
    display: inline;
    font-weight: 700;
    color: var(--Gray-80, #464c52);
  }

  .topBtns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      color: var(--Gray-70, #73777e);
      display: flex;
      cursor: pointer;
    }
    .previous {
      align-items: center;
    }
    img {
      padding-bottom: 3px;
    }
  }

  .question-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 42px 24px 39px;
    gap: 36px;
  }

  .choice-question {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .YesOrNo-question {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .question-box .question-title {
    color: #212121;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }

  .question-box .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .YesOrNo-question .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .question-box .form span {
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
  }

  .radio-buttons {
    display: flex;
    gap: 4px;
    justify-content: center;
  }
  .YesOrNo-question .radio-buttons {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
  .radio-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .YesOrNo-question .radio-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .radio-button span {
    color: var(--Gray-80, #464c52);
    text-align: center;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 15.6px */
  }
  .circle-box {
    padding: 8px 14px 12px;
    position: relative;
  }
  .circle-wrapper {
    width: 39px;
    height: 39px;
    background-color: var(--Gray-30);
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 3px;
    margin: auto;
  }

  .radio-button .circle {
    display: block;
    content: "";
    width: 21px;
    height: 21px;
    border: 3px solid var(--Gray-70, #73777e);
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radio-button .circle.active {
    border: 3px solid var(--Main-50, #6a63f5);
  }
  .radio-button .circle.active::before {
    display: block;
    content: "";
    width: 9px;
    height: 9px;
    background-color: var(--Main-50, #6a63f5);
    border-radius: 50%;
  }

  @media (max-width: 530px) {
    .finishWrapper {
      min-width: 343px;
      height: 560px;
    }
    .finishBox.first-page {
      padding: 40px 0;
    }
    .finishBox.second-page {
      padding: 30px 15px;
    }
    .finishBox.third-page {
      padding: 30px 15px;
    }
    .third-page .question-box {
      padding: 36px 0px 30px;
      gap: 36px;
    }
    .circle-box {
      padding: 8px 13px 12px;
    }

    .close {
      margin-right: 10px;
    }
    .texts {
      margin: 14px 0 40px;
    }
  }
`;
