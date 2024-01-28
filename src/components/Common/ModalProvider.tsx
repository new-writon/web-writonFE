import { useRecoilValue } from "recoil";

import { DetailPage } from "@/pages/DetailPage/DetailPage";
import { DetailModalState, modalBackgroundState } from "@/recoil/atoms";

import ContentPopupResponsive from "../atom/WritingPopup/ContentPopupResponsive";
import { DeletePopupResponsive } from "../atom/WritingPopup/DeletePopup";
import { TodayWritePopup } from "../atom/WritingPopup/TodayWritePopup";

export const ModalProvider = () => {
  const modal = useRecoilValue(modalBackgroundState);
  const detailModal = useRecoilValue(DetailModalState);

  return (
    <>
      {modal.todayWriteModal && <TodayWritePopup />}
      {modal.contentModal && <ContentPopupResponsive />}
      {modal.deleteModal && <DeletePopupResponsive />}
      {detailModal && <DetailPage />}
    </>
  );
};
