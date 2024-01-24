import { useEffect, useRef, useState } from "react";

import { getChallengeCurrent } from "@/apis/mainPage";
import profile from "@/assets/communityPage/profile.png";

import { Container } from "./style";

export const CommentPost = () => {
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

  const myProfileRendering = async () => {
    try {
      const response = await getChallengeCurrent(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1"
      );
      console.log(response);
      if (response.userProfile !== null) {
        setProfileImage(response.userProfile);
      }
    } catch {
      throw new Error("shit");
    }
  };

  useEffect(() => {
    myProfileRendering();
  }, []);
  return (
    <Container>
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
        //onKeyDown={handleOnKeyPress}
      />
      <button
        // onClick={commentRegister}
        disabled={registerBtn}
        className={registerBtn ? "" : "abled"}
      >
        등록
      </button>
    </Container>
  );
};
