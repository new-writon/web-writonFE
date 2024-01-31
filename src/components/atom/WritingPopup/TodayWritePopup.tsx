import { KeyboardEvent, useRef, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import { postMyCommunityStoryComment } from "@/apis/CommunityPage";
import { PreTodayWriteState, modalBackgroundState } from "@/recoil/atoms";

import { ContainerResponsive } from "./style";

export const TodayWritePopup = () => {
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [textNum, setTextNum] = useState<number>(0);
  const setTodayWrite = useSetRecoilState(PreTodayWriteState);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const validCharacters =
      e.currentTarget.value.match(
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g
      ) || [];

    if (validCharacters.length < 15) {
      setText(e.currentTarget.value);
      setTextNum(validCharacters.length);
    }

    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  };

  const handleOnKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        completeTodayWrite();
      }
    }
  };

  const completeTodayWrite = async () => {
    try {
      const response = postMyCommunityStoryComment(
        localStorage.getItem("organization") || "",
        Number(localStorage.getItem("challengeId") || "1"),
        text
      );
      console.log(response);
      setTodayWrite(text);
      setModal({ ...modal, todayWriteModal: false });
    } catch {
      new Error("shit");
    }
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="tooltipMessage">오늘의 한마디 내용은 작성 후 수정할 수 없어요.</div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={onChange}
          placeholder="오늘의 한마디를 입력해주세요."
          onKeyDown={handleOnKeyPress}
        />
        <div className="numCheck">({textNum}/14)</div>
        <div className="line"></div>
        <div className="popUpBtn">
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, todayWriteModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
          <div
            className="complete"
            onClick={completeTodayWrite}
          >
            완료
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};
