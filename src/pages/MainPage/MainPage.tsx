/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getFinishModal } from "@/apis/FinishModal";
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
import { mainCalendarDummyData } from "@/dummy/main";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { finishModalState } from "@/recoil/atoms";
import { CalendarRecordCurrentType, ChallengeCurrentType, communityContentProps } from "@/types";

const MainPage = () => {
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const [ChallengeCurrent, setChallengeCurrent] = useState<ChallengeCurrentType>();
  const [CalendarData, setCalendarData] = useState<CalendarRecordCurrentType[]>([]);
  const [RetrospectData, setRetrospectData] = useState<communityContentProps[][]>([]);
  const setFinishModal = useSetRecoilState(finishModalState);
  const executeAsyncTask = useAsyncWithLoading();
  const spaceToWritingPage = () => {
    dateCheck(navigate, today);
  };

  const mainPageRendering = async () => {
    executeAsyncTask(async () => {
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
        setChallengeCurrent(result[0]);
        setCalendarData(result[1]);
        setRetrospectData(result[2]);

        // 챌린지 마지막 프로세스 모달창 띄우기
        try {
          const { review } = await getFinishModal(
            localStorage.getItem("organization") || "",
            localStorage.getItem("challengeId") || "1"
          );
          if (!review) {
            if (
              (result[0].overlapPeriod === 0 && result[1][result[1].length - 1].badge === "Gold") ||
              result[0].overlapPeriod <= -1
            ) {
              setFinishModal(true);
            }
          }
        } catch {
          throw new Error("shit");
        }
      } catch {
        throw new Error("shit");
      }
    });
  };

  useEffect(() => {
    mainPageRendering();
  }, []);

  return (
    <Container>
      <ProgressBox ChallengeCurrent={ChallengeCurrent} />
      <Calendar CalendarData={CalendarData.length === 0 ? mainCalendarDummyData : CalendarData} />
      <MyRetrospect RetrospectData={RetrospectData} />
      <FloatingWriteButton onClick={spaceToWritingPage}>
        {/*모바일 일 때만 보인다/ */}
        회고 작성하기
      </FloatingWriteButton>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 23px;
  position: relative;
`;
