import styled from "styled-components";

export const Container = styled.div<{ $value: number }>`
  position: relative;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 64px 0 40px;
  .round {
    display: block;
    width: 18px;
    height: 18px;
    border: 4px solid var(--Purple-30, #aeabff);
    border-radius: 100%;
    opacity: 0.5;
    z-index: 1;
    position: absolute;
    left: ${(props) => `calc(${props.$value}% - 14px)`};
    top: 0;
    bottom: 0;
    margin: auto 0;
    @media (max-width: 1080px) {
      display: none;
    }
  }

  .message {
    z-index: 2;
    position: absolute;
    left: ${(props) =>
      props.$value > 0 && props.$value < 16
        ? `calc(${props.$value}% - 25px)`
        : props.$value > 84
          ? `calc(${props.$value}% - 165px)`
          : `calc(${props.$value}% - 97px)`};
    top: -42px;
    width: fit-content;
    padding: 8.5px 14px;
    background-color: var(--Gray-20, #f5f5f5);
    height: 30px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message p {
    z-index: 2;
    color: #616161;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 16px;
    margin: auto 0;
  }
  .message .arrow {
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    position: absolute;
    bottom: -5px;
    right: ${(props) => (props.$value > 84 ? "16px" : 0)};
    left: ${(props) =>
      props.$value > 0 && props.$value < 16 ? "13px" : props.$value > 84 ? "" : 0};
    margin: ${(props) =>
      (props.$value > 0 && props.$value < 16) || props.$value > 84 ? "0" : "0 auto"};
    border-radius: 3px;
    overflow: hidden;
    background-color: var(--Gray-20, #f5f5f5);
  }
  .date {
    position: absolute;
    left: ${(props) => `calc(${props.$value}% - 29px)`};
    bottom: -23px;
    color: var(--Gray-80, #616161);
    display: flex;
  }
  .date p {
    color: var(--Gray-50, #bdbdbd);
  }
  .endDate {
    position: absolute;
    right: 10px;
    bottom: -23px;
    color: var(--Gray-50, #bdbdbd);
  }
  .flag {
    position: absolute;
    right: -8px;
    top: -47px;
  }
`;
