import styled from "styled-components";

export const Container = styled.div`
  /* max-height: 426px; */
  min-width: 375px;
  position: absolute;
  top: 71px;
  right: 0;
  border-radius: 16px;
  border: 1px solid var(--Gray-30, #edeef1);
  background: #fff;
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
    p {
      margin-top: 2px;
      color: var(--Gray-70, #73777e);
      font-size: 0.875rem;
      line-height: 120%; /* 16.8px */
    }
  }

  .notification-wrapper .gradient {
    height: 200px;
    width: 100%;
    position: absolute;
    bottom: 0;
    img {
      width: 100%;
    }
  }
  @media (max-width: 530px) {
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    min-width: 100%;
    .notification-wrapper {
      width: 100%;
      max-height: calc(100vh - 150px);
    }
    .notification-list {
      width: 100%;
      max-height: calc(100vh - 150px);
    }
    .notification-add {
      position: absolute;
      bottom: 40px;
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
    background: var(--Gray-20, #f5f5f5);
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
    }
    .title .data {
      color: var(--Gray-100, #212121);
      line-height: 130%; /* 15.6px */
      font-weight: 600;
    }

    .date {
      color: var(--Gray-60, #959595);
      font-size: 0.75rem;
      line-height: 130%; /* 15.6px */
    }
  }
`;
