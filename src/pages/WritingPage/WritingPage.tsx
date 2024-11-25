import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { WeekCalendar } from "@/components/WritingPage/WeekCalendar";
import {
  getBasicQuestionState,
  getSpecialQuestionState,
  postWritingDataState,
} from "@/recoil/atoms";

import { WritingBox } from "./WritingBox";
import {
  useGetBasicQuestion,
  useGetCalendarRecordCurrent,
  useGetSpecialQuestion,
} from "@/hooks/reactQueryHooks/useMainHooks";

const WritingPage = () => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
  };

  const setGetBasicQuestionData = useSetRecoilState(getBasicQuestionState);
  const setGetSpecialQuestionData = useSetRecoilState(getSpecialQuestionState);
  const setpostWritingData = useSetRecoilState(postWritingDataState);

  const { data: { CalendarData = [] } = {} } =
    useGetCalendarRecordCurrent(organizationChallengeData);
  const { data: getBasicQuestionData = [] } = useGetBasicQuestion(
    localStorage.getItem("challengeId") as string
  );
  const { data: getSpecialQuestionData = [] } = useGetSpecialQuestion(
    localStorage.getItem("challengeId") as string
  );

  useEffect(() => {
    if (getBasicQuestionData.length === 0) return;

    setGetBasicQuestionData(getBasicQuestionData);
    setGetSpecialQuestionData(getSpecialQuestionData);
    setpostWritingData(
      getBasicQuestionData.map((item) => ({
        questionId: item.questionId,
        content: "",
        visibility: true,
      }))
    );
  }, [
    getBasicQuestionData,
    getSpecialQuestionData,
    setGetBasicQuestionData,
    setGetSpecialQuestionData,
    setpostWritingData,
  ]);

  return (
    <Container>
      <WeekCalendar CalendarData={CalendarData} />
      <WritingBox />
    </Container>
  );
};

export default WritingPage;

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
