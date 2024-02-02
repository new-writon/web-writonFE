/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { dateCheck } from "@/apis/header";
import {
  getCalendarRecordCurrent,
  getChallengeCurrent,
  getRetrospectCurrent,
} from "@/apis/mainPage";
import { Calendar } from "@/components/MainPage/Calendar";
import { MyRetrospect } from "@/components/MainPage/MyRetrospect";
import { ProgressBox } from "@/components/MainPage/ProgressBox";
import { FloatingWriteButton } from "@/components/atom/button";
import { CalendarRecordCurrentType, ChallengeCurrentType, communityContentProps } from "@/types";

const MainPage = () => {
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const [ChallengeCurrent, setChallengeCurrent] = useState<ChallengeCurrentType>();
  const [CalendarData, setCalendarData] = useState<CalendarRecordCurrentType[]>([]);
  const [RetrospectData, setRetrospectData] = useState<communityContentProps[][]>([]);

  const spaceToWritingPage = () => {
    dateCheck(navigate, today);
  };

  const mainPageRendering = async () => {
    try {
      const result = await Promise.all([
        getChallengeCurrent(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1"
        ),
        getCalendarRecordCurrent(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1"
        ),
        getRetrospectCurrent(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1"
        ),
      ]);
      console.log(result);
      setChallengeCurrent(result[0]);
      setCalendarData(result[1]);
      setRetrospectData(result[2]);
    } catch {
      throw new Error("shit");
    }
  };

  useEffect(() => {
    mainPageRendering();
  }, []);

  if (CalendarData.length === 0) {
    return <></>;
  } else {
    return (
      <Container>
        <ProgressBox ChallengeCurrent={ChallengeCurrent} />
        <Calendar CalendarData={CalendarData} />
        <MyRetrospect RetrospectData={RetrospectData} />
        <FloatingWriteButton onClick={spaceToWritingPage}>
          {/*모바일 일 때만 보인다/ */}
          회고 작성하기
        </FloatingWriteButton>
      </Container>
    );
  }
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
  position: relative;
`;
