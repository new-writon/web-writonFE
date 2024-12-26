import { Suspense, lazy, useEffect, useRef } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";

import { AgoraPage } from "@/pages/AgoraPage/AgoraPage";
import {
  DetailModalState,
  finishModalState,
  loadingState,
  modalBackgroundState,
  accountNumberState,
  agoraModalState,
  errorState,
  likePeopleDataState,
} from "@/recoil/atoms";

import { AccountNumberModal } from "../atom/AccountNumberModal";
import { ErrorModal } from "../atom/ErrorModal";
import { FinishModal } from "../atom/FinishModal";
import {
  CompleteEditPopupResponsive,
  CompletePopupResponsive,
} from "../atom/WritingPopup/CompletePopup";
import ContentPopupResponsive from "../atom/WritingPopup/ContentPopupResponsive";
import { DeletePopupResponsive } from "../atom/WritingPopup/DeletePopup";
import { TodayWriteAgoraPopup, TodayWritePopup } from "../atom/WritingPopup/TodayWritePopup";

import Loading from "./Loading";
import DetailPage from "@/pages/DetailPage/DetailPage";
import MobileLikePeopleList from "../atom/LikePeopleList/MobileLikePeopleList";
import useOnclickOutside from "@/hooks/useOnclickOutside";
const NotificationPermissionModal = lazy(
  () => import("../atom/NotificationPermissionModal/NotificationPermissionModal")
);

export const ModalProvider = () => {
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const detailModal = useRecoilValue(DetailModalState);
  const isLoading = useRecoilValue(loadingState);
  const finishModal = useRecoilValue(finishModalState);
  const accountNumberModal = useRecoilValue(accountNumberState);
  const agoraModal = useRecoilValue(agoraModalState);

  const likePeopleData = useRecoilValue(likePeopleDataState);
  const likePeopleRef = useRef<HTMLDivElement>(null);
  useOnclickOutside([likePeopleRef], () => setModal({ ...modal, likePeopleModal: false }));

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const [errorMessage, setErrorMessage] = useRecoilState(errorState);

  useEffect(() => {
    const handleError = (event: CustomEvent) => {
      // 만약 errorMessage가 객체라면 JSON.stringify를 사용하여 문자열로 변환
      setErrorMessage(event.detail);
    };

    window.addEventListener("api-error", handleError as EventListener);

    return () => {
      window.removeEventListener("api-error", handleError as EventListener);
    };
  }, [setErrorMessage]);
  return (
    <>
      {errorMessage && (
        <ErrorModal
          errorMessage={
            typeof errorMessage === "object" ? JSON.stringify(errorMessage, null, 2) : errorMessage
          }
        />
      )}
      {modal.todayWriteModal && <TodayWritePopup />}
      {modal.contentModal && <ContentPopupResponsive />}
      {modal.deleteModal && <DeletePopupResponsive />}
      {detailModal && <DetailPage />}
      {isLoading && <Loading />}
      {finishModal && <FinishModal />}
      {!navigator.userAgent.includes("KAKAOTALK") && modal.notificationPermissionModal && (
        <Suspense fallback={<Loading />}>
          <NotificationPermissionModal />
        </Suspense>
      )}
      {accountNumberModal && <AccountNumberModal />}
      {modal.completeModal && <CompletePopupResponsive />}
      {modal.completeEditModal && <CompleteEditPopupResponsive />}
      {/* 아고라 */}
      {modal.agoraWriteModal && <TodayWriteAgoraPopup />}
      {agoraModal && (
        <Container>
          <AgoraPage />
        </Container>
      )}
      {modal.likePeopleModal && (
        <LikePeopleContainer $likePeopleModal={modal.likePeopleModal}>
          <div
            className="wrapper"
            ref={likePeopleRef}
          >
            <MobileLikePeopleList likePeopleData={likePeopleData} />
          </div>
        </LikePeopleContainer>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  overflow: scroll;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

const LikePeopleContainer = styled.div<{ $likePeopleModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  overflow: scroll;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  .wrapper {
    width: 100%;
    height: 80vh;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: ${(props) => (props.$likePeopleModal ? slideIn : slideOut)} 0.6s ease-in-out forwards;
  }
`;
const slideIn = keyframes`
  from {
    transform: translate(-50%, 100%); /* NEW */
  }
  to {
    transform: translate(-50%, 0); /* NEW */

  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, 0); /* 변경 */
  }
  to {
    transform: translate(-50%, 100%); /* 변경 */
  }
`;
