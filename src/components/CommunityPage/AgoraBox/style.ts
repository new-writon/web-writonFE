import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--White);
  padding: 26px 26px;
  box-sizing: border-box;
  .title {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .title-and-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 12px;
  }
  .change-date {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }
  .change-date .today {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d9d9d9);
    height: 30px;
  }
  .change-date .today:hover {
    background: var(--Gray-10, #fafafa);
  }
  .change-date .previous {
    cursor: pointer;
  }

  .change-date .next {
    cursor: pointer;
    transform: rotate(180deg);
  }

  @media (max-width: 530px) {
    width: 100%;
    background-color: transparent;
    padding: 29px 0 28px;
    .title-and-date {
      margin: 31px 0 16px;
    }
  }
`;

export const AgoraItemView = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  overflow-x: scroll;
`;
