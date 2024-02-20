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
  perspective: 1000px;

  .finishBox {
    padding: 50px 0;
    min-width: 520px;
    border-radius: 16px;
    background: #fff;
    backface-visibility: hidden;
    transition: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 530px) {
    .finishBox {
      min-width: 343px;
    }
  }

  .finishBox.front {
    position: absolute;
    transform: rotateY(0deg);
  }
  .finishBox.front.next {
    transform: rotateY(-180deg);
  }
  .finishBox.back {
    position: absolute;
    transform: rotateY(180deg);
    padding: 30px 30px 50px;
  }
  .finishBox.back.next {
    transform: rotateY(0deg);
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
    color: var(--Gray-100, #212121);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 130%;
    text-align: center;
    margin-bottom: 20px;
  }
  .title.second {
    margin-top: 26px;
    margin-bottom: 30px;
  }

  .text.first {
    margin: 14px 0 30px;
    color: var(--Gray-80, #616161);
    text-align: center;
    line-height: 160%;
  }
  .texts {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 14px 0 30px;
  }
  .texts .text {
    color: var(--Gray-80, #616161);
    text-align: center;
    line-height: 160%;
  }
  .etcText {
    margin-bottom: 30px;
    color: var(--Gray-60, #959595);
    text-align: center;
    font-size: 0.75rem;
    line-height: 130%;
  }
  .purple {
    display: inline;
    color: var(--purple-50, #6a63f5);
    font-weight: 700;
  }
  .highlight {
    display: inline;
    font-weight: 700;
    color: var(--Gray-80, #616161);
  }

  .topBtns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      color: var(--Gray-70, #757575);
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
`;
