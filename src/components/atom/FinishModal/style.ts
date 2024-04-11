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

  .finishBox.front {
    position: absolute;
    /* transform: rotateY(0deg); */
    padding: 50px 0;
    transform: translateX(0);
  }
  .finishBox.front.next {
    /* transform: rotateY(-180deg); */
    transform: translateX(-500px);
    visibility: hidden;
  }
  .finishBox.back {
    position: absolute;
    /* transform: rotateY(180deg); */
    padding: 30px 30px 50px;
    transform: translateX(500px);
    visibility: hidden;
  }
  .finishBox.back.next {
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

  @media (max-width: 530px) {
    .finishWrapper {
      min-width: 343px;
      height: 560px;
    }
    .finishBox.front {
      padding: 40px 0;
    }
    .finishBox.back {
      padding: 30px 15px;
    }

    .close {
      margin-right: 10px;
    }
    .texts {
      margin: 14px 0 40px;
    }
  }
`;
