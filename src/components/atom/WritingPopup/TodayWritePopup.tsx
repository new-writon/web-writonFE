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
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
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
      e.preventDefault();
      completeTodayWrite();
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
