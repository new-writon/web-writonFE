import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { format } from "date-fns";
import { useRecoilState } from "recoil";

import { getMyCommunityStory } from "@/apis/CommunityPage";
import { postCommentWrite } from "@/apis/DetailPage";
import profile from "@/assets/communityPage/profile.png";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { CommentState } from "@/recoil/atoms";
import { commentProps } from "@/types";

import { Container } from "./style";
import { useGetMyInfo } from "@/hooks/reactQueryHooks/useMainHooks";
import useWindowWidth from "@/hooks/useWindowWidth";

export const CommentPost = ({
  userTemplateId,
  commentGroup,
  replyArray,
  setReplyArray,
  type,
  setReplyReadOn,
}: {
  userTemplateId: number;
  commentGroup: number;
  replyArray?: commentProps[];
  setReplyArray?: Dispatch<SetStateAction<commentProps[]>>;
  type?: string;
  setReplyReadOn: (replyReadOn: boolean) => void;
}) => {
  const width = useWindowWidth();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [registerBtn, setRegisterBtn] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>(profile);
  const [commentList, setCommentList] = useRecoilState(CommentState);
  const executeAsyncTask = useAsyncWithLoading();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setRegisterBtn(true);
    } else {
      setRegisterBtn(false);
    }
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  };

  const handleOnKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (!e.shiftKey) {
        e.preventDefault();
        commentRegister();
        if (textareaRef && textareaRef.current) {
          textareaRef.current.style.height = "38px";
        }
      }
    }
  };

  const { data: myInfo } = useGetMyInfo(localStorage.getItem("organization") as string);

  useEffect(() => {
    if (myInfo?.userProfile) {
      setProfileImage(myInfo.userProfile);
    }
  }, [myInfo]);

  const commentRegister = async () => {
    executeAsyncTask(async () => {
      try {
        const response = await postCommentWrite(
          userTemplateId,
          localStorage.getItem("organization") as string,
          text,
          commentGroup
        );
        try {
          const myData = await getMyCommunityStory(localStorage.getItem("challengeId") || "1");
          if (commentGroup === -1) {
            setCommentList([
              ...commentList,
              {
                position: myData.position,
                company: myData.company,
                companyPublic: myData.companyPublic,
                profile: myData.profile,
                commentId: response?.commentId.toString(),
                nickname: myData.nickname,
                userTemplateId: userTemplateId,
                content: text,
                createdAt: format(new Date(), "yyyy-MM-dd"),
                myCommentSign: 1,
                commentGroup: commentGroup.toString(),
                reply: [],
              },
            ]);
            if (width <= 530) {
              window.scrollTo({ top: document.body.scrollHeight + 100, behavior: "smooth" });
            } else {
              const DetailBox = document.getElementById("DetailBox");
              if (DetailBox) {
                DetailBox.scrollTop = DetailBox.scrollHeight;
              }
            }
          } else {
            if (replyArray && setReplyArray) {
              setReplyArray([
                ...replyArray,
                {
                  position: myData.position,
                  company: myData.company,
                  companyPublic: myData.companyPublic,
                  profile: myData.profile,
                  commentId: response?.commentId.toString(),
                  nickname: myData.nickname,
                  userTemplateId: userTemplateId,
                  content: text,
                  createdAt: format(new Date(), "yyyy-MM-dd"),
                  myCommentSign: 1,
                  commentGroup: commentGroup.toString(),
                  reply: [],
                },
              ]);
              setReplyReadOn(true);
            }
          }
        } catch {
          new Error("shit");
        }
      } catch {
        new Error("shit");
      }
      setText("");
    });
  };

  return (
    <Container $type={type}>
      <div className="profileImageCover">
        <img
          src={profileImage || profile} //{data?.profile}
          alt="profile"
        />
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        placeholder="댓글을 입력해주세요."
        onKeyDown={handleOnKeyPress}
      />
      <button
        onClick={commentRegister}
        disabled={registerBtn}
        className={registerBtn ? "" : "abled"}
      >
        등록
      </button>
    </Container>
  );
};
