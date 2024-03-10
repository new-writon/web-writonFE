import styled from "styled-components";

export const Container = styled.div`
  div:nth-child(1) {
    font-weight: 600 !important;
  }
  .title {
    padding-left: 6px;
    display: flex;
    justify-content: space-between;
    margin: 14px 0 12px;
  }
  .textQuestion {
    white-space: pre-wrap;
    width: calc(100% - 100px);
  }

  textarea {
    width: 100%;
    height: 189px;
    border-radius: 10px;
    border: 1px solid var(--Gray-30, #eee);
    background-color: var(--Gray-20, #f5f5f5);
    outline: none;
    padding: 20px;
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    caret-color: #6a63f5;
    color: var(--Gray-100, #212121);
    line-height: 24px;
    &::placeholder {
      line-height: 24px;
      font-size: 1rem;
      color: var(--Gray-60, #eee);
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;

export const ToggleBtnBox = styled.div<{ $toggleSwitchOn: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(props) =>
    props.$toggleSwitchOn ? "var(--purple-50, #6A63F5)" : "var(--Gray-60, #959595)"};
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 15px;
  min-width: fit-content;
  padding-left: 25px;
  .toggleSwitch {
    width: 32px;
    height: 18px;
    display: block;
    position: relative;
    border-radius: 100px;
    background-color: #d9d9d9;
    cursor: pointer;
    border: 1px solid #bdbdbd;
  }

  .toggleSwitch .toggleButton {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    border-radius: 100%;
    background: #fff;
  }

  .toggleSwitch.active {
    background: #8e89ff;
    border: 1px solid #6a63f5;
  }

  .toggleSwitch.active .toggleButton {
    left: calc(100% - 16px);
    background: #fff !important;
  }

  .toggleSwitch,
  .toggleButton {
    transition: all 0.2s ease-in;
  }
`;
