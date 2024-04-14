import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { format } from "date-fns";
import { useRecoilState } from "recoil";

import { getMyCommunityStory } from "@/apis/CommunityPage";
import { postCommentWrite } from "@/apis/DetailPage";
import { getChallengeCurrent } from "@/apis/mainPage";
import profile from "@/assets/communityPage/profile.png";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { CommentState } from "@/recoil/atoms";
import { commentProps } from "@/types";

import { Container } from "./style";

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
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

  const myProfileRendering = async () => {
    try {
      const response = await getChallengeCurrent(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1"
      );
      if (response.userProfile !== null) {
        setProfileImage(response.userProfile);
      }
    } catch {
      throw new Error("shit");
    }
  };

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
                job: myData.job,
                company: myData.company,
                company_public: myData.company_public,
                profile: myData.profile,
                comment_id: response?.comment_id.toString(),
                nickname: myData.nickname,
                user_templete_id: userTemplateId,
                content: text,
                created_at: format(new Date(), "yyyy-MM-dd"),
                myCommentSign: 1,
                comment_group: commentGroup.toString(),
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
                  job: myData.job,
                  company: myData.company,
                  company_public: myData.company_public,
                  profile: myData.profile,
                  comment_id: response?.comment_id.toString(),
                  nickname: myData.nickname,
                  user_templete_id: userTemplateId,
                  content: text,
                  created_at: format(new Date(), "yyyy-MM-dd"),
                  myCommentSign: 1,
                  comment_group: commentGroup.toString(),
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

  useEffect(() => {
    myProfileRendering();
  }, []);

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

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
