/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getBasicQuestion, getSpecialQuestion } from "@/apis/WritingPage";
import { getCalendarRecordCurrent } from "@/apis/mainPage";
import { WeekCalendar } from "@/components/WritingPage/WeekCalendar";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import {
  getBasicQuestionState,
  getSpecialQuestionState,
  postWritingDataState,
} from "@/recoil/atoms";
import { CalendarRecordCurrentType } from "@/types";

import { EditWritingBox } from "./EditWritingBox";

export const EditWritingPage = () => {
  const [CalendarData, setCalendarData] = useState<CalendarRecordCurrentType[]>([]);
  const setGetBasicQuestionData = useSetRecoilState(getBasicQuestionState);
  const setGetSpecialQuestionData = useSetRecoilState(getSpecialQuestionState);
  const setpostWritingData = useSetRecoilState(postWritingDataState);
  const executeAsyncTask = useAsyncWithLoading();

  const writingPageRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const result = await Promise.all([
          getCalendarRecordCurrent(
            localStorage.getItem("organization") || "",
            localStorage.getItem("challengeId") || "1"
          ),
          getBasicQuestion(localStorage.getItem("challengeId") || "1"),
          getSpecialQuestion(localStorage.getItem("challengeId") || "1"),
        ]);
        setCalendarData(result[0]);
        setGetBasicQuestionData(result[1]);
        setGetSpecialQuestionData(result[2]);
        setpostWritingData(
          result[1].map((item) => ({
            questionId: item.questionId,
            content: "",
            visibility: true,
          }))
        );
      } catch {
        throw new Error("shit");
      }
    });
  };
  useEffect(() => {
    writingPageRendering();
  }, []);
  return (
    <Container>
      <WeekCalendar CalendarData={CalendarData} />
      <EditWritingBox />
    </Container>
  );
};

const Container = styled.div`
  background: var(--Gray-20, #f8f8fa);
  padding-top: 30px;
  padding-bottom: 66px;
  position: relative;
  @media (max-width: 530px) {
    padding-top: 20px;
    padding-bottom: 0;
  }
`;
