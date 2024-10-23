import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Calendar } from "@/components/MainPage/Calendar";
import { MyRetrospect } from "@/components/MainPage/MyRetrospect";
import { ProgressBox } from "@/components/MainPage/ProgressBox";
import { FloatingWriteButton } from "@/components/atom/button";
import { mainCalendarDummyData } from "@/dummy/main";
import {
  useGetFinishModal,
  useGetNotificationPermission,
} from "@/hooks/reactQueryHooks/useCommonHooks";
import {
  useGetCalendarRecordCurrent,
  useGetChallengeCurrent,
  useGetRetrospectCurrent,
} from "@/hooks/reactQueryHooks/useMainHooks";
import {
  finishModalState,
  modalBackgroundState,
  notificationPermissionState,
} from "@/recoil/atoms";
import { dateCheck } from "@/hooks/useDateCheck";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const setFinishModal = useSetRecoilState(finishModalState);
  const setModal = useSetRecoilState(modalBackgroundState);
  const setNotificationPermission = useSetRecoilState(notificationPermissionState);

  const organizationChallengeData = {
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
  };

  const { data: ChallengeCurrent } = useGetChallengeCurrent(organizationChallengeData);
  const { data: CalendarData = [] } = useGetCalendarRecordCurrent(organizationChallengeData);
  const { data: RetrospectData = [] } = useGetRetrospectCurrent(organizationChallengeData);
  const { data: review } = useGetFinishModal(organizationChallengeData);
  const { data: notificationPermission } = useGetNotificationPermission();

  // 모달 창 띄우기 로직
  if (review && ChallengeCurrent) {
    if (
      (ChallengeCurrent.overlapPeriod === 0 &&
        CalendarData[CalendarData.length - 1].badge === "Gold") ||
      ChallengeCurrent.overlapPeriod <= -1
    ) {
      setFinishModal(true);
    }
  }

  // pwa 일때만 푸시알림 허용 창 띄우기
  function isPWA() {
    return window.matchMedia("(display-mode: standalone)").matches;
  }
  //모바일일때만 푸시알림 허용 창 띄우기
  const isTouchDevice = "ontouchstart" in window;

  // 푸시알림 허용 창 띄우기 로직
  useEffect(() => {
    if (isPWA() && isTouchDevice) {
      setNotificationPermission(notificationPermission);
      if (notificationPermission === null && ChallengeCurrent) {
        setModal((modal) => ({ ...modal, notificationPermissionModal: true }));
      }
    }
  }, [notificationPermission, ChallengeCurrent]);

  if (!ChallengeCurrent) return <></>;

  return (
    <Container>
      <ProgressBox ChallengeCurrent={ChallengeCurrent} />
      <Calendar CalendarData={CalendarData?.length === 0 ? mainCalendarDummyData : CalendarData} />
      <MyRetrospect RetrospectData={RetrospectData} />
      <FloatingWriteButton onClick={() => dateCheck(navigate, today, CalendarData)}>
        {/*모바일 일 때만 보인다/ */}
        회고 작성하기
      </FloatingWriteButton>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray-20, #f8f8fa);
  padding-top: 23px;
  position: relative;
`;
