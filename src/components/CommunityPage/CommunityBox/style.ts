import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  .nodata {
    margin-top: 80px;
  }
  @media (max-width: 530px) {
    background-color: var(--Gray-20, #f8f8fa);
  }
`;

export const CommunityHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 31px 0 21px;
  position: -webkit-sticky;
  position: sticky;
  top: 71px;
  z-index: 9999;
  border-bottom: 1px solid var(--Gray-30, #edeef1);
  background-color: var(--Gray-20, #f8f8fa);
  @media (min-width: 691px) {
    padding-left: 26px;
  }
  @media (max-width: 530px) {
    top: 105px;
    padding-left: 0;
  }
  .title {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .flex {
    display: flex;
    font-size: 1.25rem;
  }
  .flex .number {
    margin: 0;
  }
  .categoryAndDate {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }
  .categoriesMobile {
    min-width: fit-content;
    display: flex;
    gap: 4px;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    height: 30px;
  }
  .categoriesMobile p {
    color: var(--Gray-80, #464c52);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    white-space: nowrap;
    display: flex;
  }
  .categoriesMobileActvie {
    border: 1px solid var(--Main-50, #6272ff);
    background: var(--Main-0, #f5f7ff);
    p {
      color: var(--Main-50, #6272ff);
    }
  }

  .categoriesMobileView {
    margin-top: 12px;
    display: flex;
    gap: 8px;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .categories {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .line {
    margin: 0 4px;
    width: 1px;
    height: 24px;
    background: var(--Gray-40, #d2d5db);
  }

  .changeDate {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .changeDate .calendar {
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    padding: 3px 8px 3px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .changeDate .calendar:hover {
    background: var(--Gray-30, #edeef1);
  }
  .changeDate .calendar img[alt="v"] {
    margin-top: 2px;
  }
  .changeDate .today {
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    height: 30px;
  }
  .changeDate .today:hover {
    background: var(--Gray-10, #fcfcfc);
  }
  .changeDate .previous {
    cursor: pointer;
  }

  .changeDate .next {
    cursor: pointer;
    transform: rotate(180deg);
  }

  .react-calendar-container {
    z-index: 9;
    position: absolute;
    top: 35px;
    right: 0;
    width: fit-content;
    height: fit-content;
  }
`;

export const CommunityItemBox = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 18px;
  padding-bottom: 150px;
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;
