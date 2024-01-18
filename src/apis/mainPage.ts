import { CalendarRecordCurrentType, ChallengeCurrentType, RetrospectCurrentType } from "@/types";

import { getData } from ".";

// 매안페이지 챌린지 현황 젤 위에 컴포넌트
export const getChallengeCurrent = async (organization: string, challengeId: string) => {
  const response = await getData<ChallengeCurrentType>(
    `/challenge/record/present-situation/${organization}/${challengeId}`
  );
  return response.data;
};

//메인페이지 챌린지 달력 2번째 컴포넌트
export const getCalendarRecordCurrent = async (
  organization: string,
  challengeId: string,
  month: string
) => {
  const response = await getData<CalendarRecordCurrentType[]>(
    `/challenge/record/calendar/${organization}/${challengeId}/${month}`
  );
  return response.data;
};

//메인페이지 나의 회고 3번째 컴포넌트
export const getRetrospectCurrent = async (
  organization: string,
  challengeId: string,
  month: string
) => {
  const response = await getData<RetrospectCurrentType[][]>(
    `/challenge/record/reminiscence/${organization}/${challengeId}/${month}`
  );
  return response.data;
};
