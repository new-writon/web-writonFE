import styled from "styled-components";

import downArrow from "@/assets/mainPage/downArrow.svg";
import clalendarIcon from "@/assets/mainPage/icon-calendar.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";

export const CalendarToggle = ({
  toggle,
  onClick,
  page,
}: {
  toggle: boolean;
  onClick: () => void;
  page?: string;
}) => {
  return (
    <Container
      onClick={onClick}
      className={page ? page : ""}
    >
      <div className="calendarOpenBtn">{toggle ? "달력 접기" : "달력 펼치기"}</div>
      <div className="calendarOpenBtnResponsive">
        <img
          src={clalendarIcon}
          alt="달력"
        />
      </div>
      <img
        className={`${toggle ? "topArrow" : "downArrow"}`}
        src={toggle ? topArrow : downArrow}
        alt="V"
      />
    </Container>
  );
};

const Container = styled.div<{ onClick: () => void }>`
  display: flex;
  color: var(--Gray-70, #73777e);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 14px 16px 12px;
  border-radius: 10px;
  border: 1px solid var(--Gray-40, #d2d5db);
  cursor: pointer;
  img {
    margin-left: 9px;
  }
  img.topArrow {
    margin-bottom: 2px;
  }

  .calendarOpenBtnResponsive {
    display: none;
  }

  @media (max-width: 575px) {
    // 달력 버튼
    & {
      border: none;
      padding: 0;
      padding-right: 10px;
      align-items: center;
    }
    .calendarOpenBtn {
      display: none;
    }
    .calendarOpenBtnResponsive {
      display: block;
    }
  }

  // 달력 버튼
  &.community {
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    padding: 3px 8px 3px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  &.community img {
    margin-left: 0;
  }
  &.community .calendarOpenBtn {
    display: none;
  }
  &.community .calendarOpenBtnResponsive {
    display: block;
  }

  &.community:hover {
    background: var(--Gray-30, #edeef1);
  }
`;
