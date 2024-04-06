import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

import commentIcon from "@/assets/DetailPage/comment.svg";

import { Container } from "./style";

export const SmallTalkTitle = ({ date, number }: { date: string; number: number }) => {
  return (
    <Container>
      <img
        src={commentIcon}
        alt="C"
      />
      <span>
        {date && isSameDay(date, new Date()) ? "오늘" : format(date, "M월 d일", { locale: ko })}의
        스몰톡
      </span>
      {number !== 5 && <span className="number">{number}개</span>}
    </Container>
  );
};
