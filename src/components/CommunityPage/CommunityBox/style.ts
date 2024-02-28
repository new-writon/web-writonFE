import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  .nodata {
    margin-top: 80px;
  }
  @media (max-width: 530px) {
    background-color: var(--Gray-20, #f5f5f5);
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
  border-bottom: 1px solid var(--Gray-30);
  background-color: var(--Gray-20, #f5f5f5);
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
    border: 1px solid var(--Gray-40, #d9d9d9);
    height: 30px;
  }
  .categoriesMobile p {
    color: var(--Gray-80, #616161);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    white-space: nowrap;
    display: flex;
  }
  .categoriesMobileActvie {
    border: 1px solid var(--purple-50, #6a63f5);
    background: var(--Purple-0, #f8f8ff);
    p {
      color: var(--purple-50, #6a63f5);
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
    background: var(--Gray-40, #d9d9d9);
  }

  .changeDate {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .changeDate .calendar {
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d9d9d9);
    padding: 3px 8px 3px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .changeDate .calendar:hover {
    background: var(--Gray-30, #eee);
  }
  .changeDate .calendar img[alt="v"] {
    margin-top: 2px;
  }
  .changeDate .today {
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
  .changeDate .today:hover {
    background: var(--Gray-10, #fafafa);
  }
  .changeDate .previous {
    cursor: pointer;
  }

  .changeDate .next {
    cursor: pointer;
    transform: rotate(180deg);
  }

  //캘린더 css 적용
  .react-calendar {
    z-index: 9;
    position: absolute;
    top: 35px;
    right: 0;
    min-width: 290px;
    height: auto;
    max-width: 100%;
    box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
    border-radius: 16px;
    background: #fff;
    font-family: "Pretendard Variable", sans-serif;
    line-height: 1rem;
    border: none;
    padding: 15px;
  }
  .react-calendar__navigation {
    display: flex;
    height: auto;
    margin: 10px 0;
  }
  .react-calendar__navigation button:disabled {
    background-color: #fff;
  }
  .react-calendar abbr {
    text-decoration-line: blink;
  }
  .react-calendar__tile--now {
    background: #fff;
  }
  .react-calendar__tile:disabled {
    background-color: #fff;
    color: #bdbdbd;
  }
  .react-calendar__tile:disabled abbr {
    color: #bdbdbd;
  }
  .react-calendar button:enabled {
    width: fit-content;
    height: inherit;
    border-radius: 100%;
  }
  .react-calendar__tile--active {
    background-color: #000;
    color: #fff;
  }
  .react-calendar__tile--active abbr {
    color: #fff;
  }
  .react-calendar__tile:enabled:hover {
    background-color: #fafafa;
  }
  .react-calendar__tile:enabled:focus {
    background-color: #eeeeee;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #000;
    color: #fff;
  }

  .react-calendar__navigation__label {
    flex-grow: inherit !important;
    padding-left: 10px;
    color: #000;
    font-size: 1rem;
    font-weight: 700;
  }
  .react-calendar__navigation .react-calendar__navigation__arrow {
    display: none;
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
