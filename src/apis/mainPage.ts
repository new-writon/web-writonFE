import { CalendarRecordCurrentType, ChallengeCurrentType, mainThirdCoponentType } from "@/types";
import { organizationChallengeDataType } from "@/types/axios";

import { getData } from ".";

// 매안페이지 챌린지 현황 젤 위에 컴포넌트
export const getChallengeCurrent = async ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  const response = await getData<ChallengeCurrentType>(
    `/user/challenge/present-situation/${organization}/${challengeId}`
  );
  return response;
};

//메인페이지 챌린지 달력 2번째 컴포넌트
export const getCalendarRecordCurrent = async ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  const response = await getData<{
    calendarData: CalendarRecordCurrentType[];
    calendarWithGrayData: CalendarRecordCurrentType[];
  }>(`/user/challenge/calendar/${organization}/${challengeId}`);
  return response;
};

//메인페이지 나의 회고 3번째 컴포넌트
export const getRetrospectCurrent = async ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  const response = await getData<mainThirdCoponentType>(
    `/template/root/reminiscence/${organization}/${challengeId}`
  );
  return response;
};
