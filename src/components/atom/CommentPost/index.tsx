import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import profile from "@/assets/communityPage/profile.png";
import { Container } from "./style";
import { useGetMyInfo, usePostComment } from "@/hooks/reactQueryHooks/useMainHooks";
import useWindowWidth from "@/hooks/useWindowWidth";

export const CommentPost = ({
  userTemplateId,
  commentGroup,
  type,
  setReplyReadOn,
}: {
  userTemplateId: number;
  commentGroup: number;
  type?: string;
  setReplyReadOn: (replyReadOn: boolean) => void;
}) => {
  const width = useWindowWidth();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [registerBtn, setRegisterBtn] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>(profile);

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
        submitComment();
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

  const { mutate: postCommentMutate } = usePostComment();

  const submitComment = () => {
    postCommentMutate(
      {
        userTemplateId,
        organization: localStorage.getItem("organization") as string,
        content: text,
        commentGroup,
      },
      {
        onSuccess: () => {
          setText("");
          if (commentGroup === -1) {
            if (width <= 530) {
              window.scrollTo({ top: document.body.scrollHeight + 100, behavior: "smooth" });
            } else {
              const DetailBox = document.getElementById("DetailBox");
              if (DetailBox) {
                DetailBox.scrollTop = DetailBox.scrollHeight;
              }
            }
          } else {
            setReplyReadOn(true);
          }
        },
        onError: (error) => {
          console.log("Error posting Agora topic:", error);
          // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
        },
      }
    );
  };

  // const commentRegister = async () => {
  //   executeAsyncTask(async () => {
  //     try {
  //       const response = await postCommentWrite(
  //         userTemplateId,
  //         localStorage.getItem("organization") as string,
  //         text,
  //         commentGroup
  //       );
  //       try {
  //         const myData = await getMyCommunityStory(localStorage.getItem("challengeId") || "1");
  //         if (commentGroup === -1) {
  //           setCommentList([
  //             ...commentList,
  //             {
  //               position: myData.position,
  //               company: myData.company,
  //               companyPublic: myData.companyPublic,
  //               profile: myData.profile,
  //               commentId: response?.commentId.toString(),
  //               nickname: myData.nickname,
  //               userTemplateId: userTemplateId,
  //               content: text,
  //               createdAt: format(new Date(), "yyyy-MM-dd"),
  //               myCommentSign: 1,
  //               commentGroup: commentGroup.toString(),
  //               reply: [],
  //             },
  //           ]);
  //           if (width <= 530) {
  //             window.scrollTo({ top: document.body.scrollHeight + 100, behavior: "smooth" });
  //           } else {
  //             const DetailBox = document.getElementById("DetailBox");
  //             if (DetailBox) {
  //               DetailBox.scrollTop = DetailBox.scrollHeight;
  //             }
  //           }
  //         } else {
  //           if (replyArray && setReplyArray) {
  //             setReplyArray([
  //               ...replyArray,
  //               {
  //                 position: myData.position,
  //                 company: myData.company,
  //                 companyPublic: myData.companyPublic,
  //                 profile: myData.profile,
  //                 commentId: response?.commentId.toString(),
  //                 nickname: myData.nickname,
  //                 userTemplateId: userTemplateId,
  //                 content: text,
  //                 createdAt: format(new Date(), "yyyy-MM-dd"),
  //                 myCommentSign: 1,
  //                 commentGroup: commentGroup.toString(),
  //                 reply: [],
  //               },
  //             ]);
  //             setReplyReadOn(true);
  //           }
  //         }
  //       } catch {
  //         new Error("shit");
  //       }
  //     } catch {
  //       new Error("shit");
  //     }
  //     setText("");
  //   });
  // };

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
        onClick={submitComment}
        disabled={registerBtn}
        className={registerBtn ? "" : "abled"}
      >
        등록
      </button>
    </Container>
  );
};
