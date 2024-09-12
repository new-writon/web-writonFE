// 오늘이 글을 쓰는 날짜인지 판단하는 훅

import { CalendarRecordCurrentType } from "@/types";
import { format } from "date-fns";

// CalendarData를 사용하여 오늘 날짜에 대한 처리
export const dateCheck = (
  navigate: (arg0: string) => void,
  today: string,
  CalendarData: CalendarRecordCurrentType[]
) => {
  // 오늘 날짜가 CalendarData에 있는지 확인
  const todayData = CalendarData.find(
    (item) => format(new Date(item.date), "yyyy-MM-dd") === today
  );

  if (!todayData) {
    // 오늘 날짜가 없으면, 오늘은 글을 작성할 필요 없는 날
    alert("오늘은 글을 작성할 필요가 없는 날입니다.");
    return;
  }

  if (todayData.badge !== "Purple") {
    // 오늘 날짜가 있지만 이미 글을 작성한 상태 (badge가 "purple"이 아님)
    alert("오늘은 이미 글을 작성하셨습니다!");
  } else {
    // 오늘 날짜가 있고 글을 아직 작성하지 않은 상태
    navigate(`/writing/${today}`);
  }
};
