import styled from "styled-components";

export const Container = styled.div`
  /* max-height: 426px; */
  min-width: 375px;
  width: max-content;
  position: absolute;
  top: 71px;
  right: 0;
  border-radius: 16px;
  border: 1px solid var(--Gray-30, #edeef1);
  border-bottom: none;
  background: var(--White, #fff);
  padding: 20px;
  /* Dropshadow/popup */
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  .notification-list {
    max-height: 375px;
    overflow-y: scroll;
  }
  .notification-add {
    cursor: pointer;
    margin-top: 20px;
    width: 116px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--Gray-40, #d2d5db);
    gap: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 2px;
      color: var(--Gray-70, #73777e);
      font-size: 0.875rem;
      line-height: 120%; /* 16.8px */
    }
  }

  .notification-wrapper .gradient {
    width: 100%;
    position: absolute;
    bottom: 0;
    img {
      width: 100%;
    }
  }
  .notification-wrapper .gradient.gradient-on {
    display: none;
  }
  @media (max-width: 530px) {
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    min-width: 100%;
    .notification-wrapper {
      width: 100%;
      height: calc(var(--vh, 1vh) * 100 - 120px);
    }
    .notification-list {
      width: 100%;
      max-height: calc(var(--vh, 1vh) * 100 - 235px);
    }
    .notification-add {
      position: absolute;
      bottom: 20px;
      border: 1px solid var(--Gray-40, #d2d5db);
      border-radius: 6px;
      width: calc(100% - 32px);
      min-height: 44px;
    }
  }
`;

export const ItemContainer = styled.div<{ $click: boolean }>`
  border-bottom: 1px solid var(--Gray-30, #edeef1);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  cursor: pointer;
  background-color: ${(props) => props.$click && "#FCFCFC"};

  .second {
    opacity: ${(props) => props.$click && "0.4"};
  }
  &:hover {
    background: var(--Gray-20, #f8f8fa);
  }
  .second {
    gap: 4px;
    display: flex;
    flex-direction: column;
    .notification-title {
      display: flex;
      color: var(--Gray-80, #464c52);
      font-size: 0.875rem;
      line-height: 160%;
      font-weight: 500;
      align-items: center;
    }
    .notification-title .data {
      color: var(--Gray-100, #1b1d1f);
      line-height: 130%; /* 15.6px */
      font-weight: 600;
    }

    .date {
      color: var(--Gray-60, #94989f);
      font-size: 0.75rem;
      line-height: 130%; /* 15.6px */
    }
  }
`;

export const NoNotificationView = styled.div<{ $type: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin: auto;
  margin-top: ${(props) => (props.$type === "mobile" ? "20px" : "0")};
  height: ${(props) => (props.$type === "mobile" ? "calc(var(--vh, 1vh) * 100 - 120px)" : "auto")};

  span {
    overflow: hidden;
    color: #94989f;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
`;
