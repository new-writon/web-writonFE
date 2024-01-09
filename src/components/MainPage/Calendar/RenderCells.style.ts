import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  .row {
    display: flex;
  }
  .cell {
    width: 100%;
    border-top: 1px solid var(--Gray-30);
  }
  .cell.valid.weekend,
  .cell.selected.weekend,
  .cell.disabled.weekend {
    background-color: var(--Gray-10);
  }
  .innerday .text {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    background-color: inherit;
    color: var(--Gray-80);
    font-size: var(--text_cap1);
    font-weight: 500;
  }

  .disabled .innerday .text {
    color: var(--Gray-60);
  }

  .valid {
    background-color: var(--White);
  }

  .innerday {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .innerday img {
    margin: 4px 0 7px;
    width: 75%;
    height: 440%;
    max-width: 96px;
    max-height: 96px;
  }
  .innerday .virtualImg {
    visibility: hidden; // 가상의 이미지임
  }
  .cell.selected .innerday img {
    margin-top: 7px;
  }

  .cell.selected .innerday .text {
    color: var(--White);
    z-index: 1;
  }
  .selected::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background-color: var(--purple-50, #6a63f5);
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 100%;
  }

  .writeActive {
    filter: drop-shadow(0px 5px 20px rgba(106, 99, 245, 0.3));
    cursor: pointer;
  }
`;
