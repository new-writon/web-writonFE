import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const SubCalendar = ({
  dateActive,
  clickDay,
}: {
  dateActive: string[]; //활성화할 날짜들 ["2024-08-02","2024-08-03","2024-08-04"]
  clickDay: (value: Date) => void; //클릭한 날짜로 이벤트
}) => {
  return (
    <Container>
      <Calendar
        locale="ko"
        formatDay={(_locale, date) => moment(date).format("D")}
        value={localStorage.getItem("date")} //저장된 날짜로 캘린더 시작 (현재 날짜 또는 커뮤니티 활성화 날짜)
        minDate={new Date(dateActive[0])} //활성화 시작 날짜
        maxDate={new Date(dateActive[dateActive.length - 1])} //활성화 끝나는 날짜
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        onClickDay={clickDay}
        goToRangeStartOnSelect={true}
        tileDisabled={({ date }) => {
          // 비활성화할 날짜들을 포함하는 Set 객체 생성
          const disabledDates = new Set(
            dateActive.map((dateString) => new Date(dateString).toDateString())
          );
          // 현재 날짜가 비활성화할 날짜 목록에 포함되어 있는지 확인하여 반환
          return !disabledDates.has(date.toDateString());
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  //캘린더 css 적용
  .react-calendar {
    width: 290px;
    height: auto;
    max-width: 100%;
    box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
    border-radius: 16px;
    background: var(--White, #fff);
    font-family: "Pretendard Variable", sans-serif;
    line-height: 1rem;
    border: none;
    padding: 15px;
    box-sizing: border-box;
  }

  .react-calendar button:enabled {
    // 달력 원 크기
    transform: scale(0.85);
  }

  .react-calendar__navigation {
    display: flex;
    height: auto;
    margin: 10px 0;
    width: 100%;
  }
  .react-calendar__navigation button:disabled {
    background-color: var(--White, #fff);
  }
  .react-calendar abbr {
    text-decoration-line: blink;
  }
  .react-calendar__tile--now {
    background: transparent;
  }
  .react-calendar--selectRange .react-calendar__tile--now.react-calendar__tile--hover {
    background: #e6e6e6 !important;
  }

  .react-calendar__tile:disabled {
    background-color: var(--White, #fff);
    color: var(--Gray-50, #b1b4bc);
    transform: scale(0.85);
  }
  .react-calendar__tile:disabled abbr {
    color: var(--Gray-50, #b1b4bc);
  }
  .react-calendar button:enabled {
    width: fit-content;
    height: inherit;
    border-radius: 100%;
  }
  .react-calendar__tile--active {
    background-color: #000;
    color: var(--White, #fff);
  }
  .react-calendar__tile--active abbr {
    color: var(--White, #fff);
  }
  /* .react-calendar__tile:enabled:hover {
    background-color: var(--Gray-10, #fcfcfc);
  } */
  .react-calendar__tile:enabled:focus {
    background-color: var(--Gray-30, #edeef1);
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #000;
    color: var(--White, #fff);
  }

  .react-calendar__month-view__days__day--weekend {
    // 주말 글씨 빨간색 없애기
    color: #000000;
  }
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__navigation__label {
    flex-grow: inherit !important;
    padding-left: 10px;
    color: #000;
    font-size: 1rem;
    font-weight: 700;
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    order: 1;
  }
  .react-calendar__navigation__prev-button {
    position: absolute;
    right: 30px;
  }
  .react-calendar__navigation__next-button {
    position: absolute;
    right: 0;
  }
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }
  .react-calendar__navigation button {
    min-width: 32px;
  }
`;
