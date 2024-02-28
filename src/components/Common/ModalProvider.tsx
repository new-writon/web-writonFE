import { useRecoilValue } from "recoil";

import { DetailPage } from "@/pages/DetailPage/DetailPage";
import {
  DetailModalState,
  finishModalState,
  loadingState,
  modalBackgroundState,
  accountNumberState,
} from "@/recoil/atoms";

import { AccountNumberModal } from "../atom/AccountNumberModal";
import { FinishModal } from "../atom/FinishModal";
import ContentPopupResponsive from "../atom/WritingPopup/ContentPopupResponsive";
import { DeletePopupResponsive } from "../atom/WritingPopup/DeletePopup";
import { TodayWritePopup } from "../atom/WritingPopup/TodayWritePopup";

import Loading from "./Loading";

export const ModalProvider = () => {
  const modal = useRecoilValue(modalBackgroundState);
  const detailModal = useRecoilValue(DetailModalState);
  const isLoading = useRecoilValue(loadingState);
  const finishModal = useRecoilValue(finishModalState);
  const accountNumberModal = useRecoilValue(accountNumberState);
  return (
    <>
      {modal.todayWriteModal && <TodayWritePopup />}
      {modal.contentModal && <ContentPopupResponsive />}
      {modal.deleteModal && <DeletePopupResponsive />}
      {detailModal && <DetailPage />}
      {isLoading && <Loading />}
      {finishModal && <FinishModal />}
      {accountNumberModal && <AccountNumberModal />}
    </>
  );
};
