import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { AgoraPage } from "@/pages/AgoraPage/AgoraPage";
import { DetailPage } from "@/pages/DetailPage/DetailPage";
import {
  DetailModalState,
  finishModalState,
  loadingState,
  modalBackgroundState,
  accountNumberState,
  agoraModalState,
} from "@/recoil/atoms";

import { AccountNumberModal } from "../atom/AccountNumberModal";
import { FinishModal } from "../atom/FinishModal";
import {
  CompleteEditPopupResponsive,
  CompletePopupResponsive,
} from "../atom/WritingPopup/CompletePopup";
import ContentPopupResponsive from "../atom/WritingPopup/ContentPopupResponsive";
import { DeletePopupResponsive } from "../atom/WritingPopup/DeletePopup";
import { TodayWriteAgoraPopup, TodayWritePopup } from "../atom/WritingPopup/TodayWritePopup";

import Loading from "./Loading";

export const ModalProvider = () => {
  const modal = useRecoilValue(modalBackgroundState);
  const detailModal = useRecoilValue(DetailModalState);
  const isLoading = useRecoilValue(loadingState);
  const finishModal = useRecoilValue(finishModalState);
  const accountNumberModal = useRecoilValue(accountNumberState);
  const agoraModal = useRecoilValue(agoraModalState);
  return (
    <>
      {modal.todayWriteModal && <TodayWritePopup />}
      {modal.contentModal && <ContentPopupResponsive />}
      {modal.deleteModal && <DeletePopupResponsive />}
      {detailModal && <DetailPage />}
      {isLoading && <Loading />}
      {finishModal && <FinishModal />}
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
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
`;
