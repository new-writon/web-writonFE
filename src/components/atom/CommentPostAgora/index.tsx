import { KeyboardEvent, useRef, useState } from "react";

import { isSameDay } from "date-fns";

import profile from "@/assets/communityPage/profile.png";

import { Container } from "./style";
import { usePostAgoraComment } from "@/hooks/reactQueryHooks/useMainHooks";

export const CommentPostAgora = ({
  myProfile,
  smallTalkId,
  agoraDate,
}: {
  myProfile: string;
  smallTalkId: number;
  agoraDate: string;
}) => {
  const organizationChallengeData = {
    organization: localStorage.getItem("organization") || "",
    challengeId: localStorage.getItem("challengeId") || "1",
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [registerBtn, setRegisterBtn] = useState<boolean>(true);

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
  const { mutate: postAgoraCommentMutate } = usePostAgoraComment();

  const submitComment = () => {
    postAgoraCommentMutate(
      {
        organization: organizationChallengeData.organization,
        smallTalkId,
        text,
      },
      {
        onSuccess: () => {
          setText("");
          setRegisterBtn(true);
        },
        onError: (error) => {
          console.log("Error posting Agora topic:", error);
          // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
        },
      }
    );
  };

  // const submitComment = async () => {
  //   executeAsyncTask(async () => {
  //     try {
  //       await postAgoraComment(localStorage.getItem("organization") as string, smallTalkId, text);
  //       setChatData([
  //         ...chatData,
  //         {
  //           smallTalkCommentId: 0,
  //           content: text,
  //           nickname: nickname,
  //           profile: myProfile,
  //           createdTime: format(new Date(), "HH:mm"),
  //           myCommentSign: "1",
  //         },
  //       ]);
  //       if (agoraData.mySmallTalkSign !== "1") {
  //         const updatedAgoraData = agoraDataArray
  //           ?.map((item) => {
  //             // smallTalkId가 일치하는 경우에만 number를 증가시킴
  //             if (item.smallTalkId === smallTalkId) {
  //               return {
  //                 ...item,
  //                 participateCount: item.participateCount + 1,
  //                 mySmallTalkSign: "1",
  //               };
  //             }
  //             // smallTalkId가 일치하지 않는 경우 기존 아이템 반환
  //             return item;
  //           })
  //           .filter((item): item is agoraDataType => !!item);
  //         setAgoraDataArray(updatedAgoraData);
  //       }
  //       setText("");
  //       setRegisterBtn(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

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
