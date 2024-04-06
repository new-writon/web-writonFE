import { Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react";

import { format, isSameDay } from "date-fns";

import { postAgoraComment } from "@/apis/CommunityPage";
import profile from "@/assets/communityPage/profile.png";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { agoraCommentType } from "@/types";

import { Container } from "./style";

export const CommentPostAgora = ({
  nickname,
  myProfile,
  agoraId,
  chatData,
  setChatData,
  agoraDate,
}: {
  nickname: string;
  myProfile: string;
  agoraId: number;
  chatData: agoraCommentType[];
  setChatData: Dispatch<SetStateAction<agoraCommentType[]>>;
  agoraDate: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [registerBtn, setRegisterBtn] = useState<boolean>(true);
  const executeAsyncTask = useAsyncWithLoading();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setRegisterBtn(true);
    } else {
      setRegisterBtn(false);
    }
  };

  const handleOnKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (!e.shiftKey) {
        e.preventDefault();
        submitComment();
      }
    }
  };

  const submitComment = async () => {
    executeAsyncTask(async () => {
      try {
        await postAgoraComment(localStorage.getItem("organization") as string, agoraId, text);
        setChatData([
          ...chatData,
          {
            agora_comment_id: 0,
            content: text,
            nickname: nickname,
            profile: myProfile,
            created_time: format(new Date(), "HH:mm"),
            myCommentSign: "1",
          },
        ]);
        setText("");
        setRegisterBtn(true);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Container $today={isSameDay(agoraDate, new Date())}>
      <div className="profileImageCover">
        <img
          src={myProfile || profile} //{data?.profile}
          alt="profile"
        />
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        placeholder={
          isSameDay(agoraDate, new Date()) ? "내용을 입력해주세요." : "종료된 스몰톡이에요."
        } // 날짜 보내서 창에 이름 변경하기
        onKeyDown={handleOnKeyPress}
      />
      <button
        onClick={submitComment}
        disabled={registerBtn}
        className={registerBtn ? "" : "abled"}
      >
        등록
      </button>
    </Container>
  );
};
