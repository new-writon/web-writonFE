import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { patchEditWritingSubmit } from "@/apis/\bEditWritingPage";
import { postwritingSubmit } from "@/apis/WritingPage";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import {
  DateResponsiveState,
  modalBackgroundState,
  postEditWritingDataState,
  postWritingDataState,
} from "@/recoil/atoms";
import { writingPagePopUpProps } from "@/types";

import { Container, ContainerResponsive } from "./style";

export const CompletePopup = ({ onClick, setpopUpOn }: writingPagePopUpProps) => {
  return (
    <Container>
      <div className="popUpTitle completePopup">글 작성을 완료할까요?</div>
      <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
      <div className="popUpBtn">
        <div
          className="close"
          onClick={() => setpopUpOn(false)}
        >
          취소
        </div>
        <div
          className="complete"
          onClick={onClick}
        >
          완료
        </div>
      </div>
    </Container>
  );
};

export const CompletePopupResponsive = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const postWritingData = useRecoilValue(postWritingDataState);
  const DateResponsive = useRecoilValue(DateResponsiveState);
  const executeAsyncTask = useAsyncWithLoading();
  const submitWrite = async () => {
    executeAsyncTask(async () => {
      await postwritingSubmit(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1",
        DateResponsive || "",
        postWritingData
      );
      navigate("/");
      setModal({ ...modal, completeModal: false });
      document.body.style.overflowY = "auto";
    });
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="popUpTitle">글 작성을 완료할까요?</div>
        <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
        <div className="popUpBtn">
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, completeModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
          <div
            className="complete"
            onClick={submitWrite}
          >
            완료
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};

export const CompleteEditPopupResponsive = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const postEditWritingData = useRecoilValue(postEditWritingDataState);
  const executeAsyncTask = useAsyncWithLoading();

  const submitEditWrite = async () => {
    executeAsyncTask(async () => {
      const postSubmitArray = postEditWritingData.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ question, category, userTempleteId, ...rest }) => rest
      );

      try {
        await patchEditWritingSubmit(postEditWritingData[0].userTempleteId, postSubmitArray);
        navigate(`/detail/${postEditWritingData[0].userTempleteId}`);
        setModal({ ...modal, completeEditModal: false });
        document.body.style.overflowY = "auto";
      } catch {
        new Error("shit");
      }
    });
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="popUpTitle">글 수정을 완료할까요?</div>
        <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
        <div className="popUpBtn">
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, completeEditModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
          <div
            className="complete"
            onClick={submitEditWrite}
          >
            완료
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};
