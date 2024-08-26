import { CalendarRecordCurrentType, ChallengeCurrentType, mainThirdCoponentType } from "@/types";

import { getData } from ".";

// 매안페이지 챌린지 현황 젤 위에 컴포넌트
export const getChallengeCurrent = async (organization: string, challengeId: string) => {
  const response = await getData<ChallengeCurrentType>(
    `/user/challenge/present-situation/${organization}/${challengeId}`
  );
  return response.data;
};

//메인페이지 챌린지 달력 2번째 컴포넌트
export const getCalendarRecordCurrent = async (organization: string, challengeId: string) => {
  const response = await getData<{ calendarData: CalendarRecordCurrentType[] }>(
    `/user/challenge/calendar/${organization}/${challengeId}`
  );
  return response.data.calendarData;
};

//메인페이지 나의 회고 3번째 컴포넌트
export const getRetrospectCurrent = async (organization: string, challengeId: string) => {
  const response = await getData<mainThirdCoponentType>(
    `/template/root/reminiscence/${organization}/${challengeId}`
  );
  return response.data;
};
