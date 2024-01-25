import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { postLike, postLikeDelete } from "@/apis/DetailPage";
import comment from "@/assets/DetailPage/comment.svg";
import fireOff from "@/assets/DetailPage/fireOff.svg";
import fireOn from "@/assets/DetailPage/fireOn.svg";
import { LikeState } from "@/recoil/atoms";

import { Container } from "./style";

export const CommnetAndLikeFloating = ({
  userTemplateId,
  myLikeSign,
  commentCount,
  likeCount,
}: {
  userTemplateId: number;
  myLikeSign: string;
  commentCount: string;
  likeCount: string;
}) => {
  const [IsHover, setIsHover] = useState<boolean>(false);
  const [IsClick, setIsCick] = useState<boolean>(false);
  const setLikeCount = useSetRecoilState(LikeState);

  const LikeFunc = async () => {
    if (!IsClick) {
      // 클릭 아직 안했을 때 좋아요수 변경 +1

      const response = await postLike(
        userTemplateId,
        localStorage.getItem("organization") || "letsintern"
      );
      console.log(response);
      setLikeCount((Number(likeCount) + 1).toString());
      setIsCick(true);
    } else {
      const response = await postLikeDelete(
        userTemplateId,
        localStorage.getItem("organization") || "letsintern"
      );
      console.log(response);
      setLikeCount((Number(likeCount) - 1).toString());
      setIsCick(false);
    }
  };

  useEffect(() => {
    if (myLikeSign === "1") {
      setIsCick(true);
    } else if (myLikeSign === "0") {
      setIsCick(false);
    }
  }, [myLikeSign]);
  return (
    <Container>
      <div className="Box">
        <div
          className={`likeBox round ${IsHover && "hover"}  ${IsClick && "click"}`}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          onClick={LikeFunc}
        >
          <img
            src={IsClick ? fireOn : IsHover ? fireOn : fireOff}
            alt="fire"
          />
          <div className="num">{likeCount}</div>
        </div>
        <div className="ment">응원해요</div>
      </div>
      <div className="Box">
        <div className="commentBox round">
          <img
            src={comment}
            alt="fire"
          />
          <div className="num">{commentCount}</div>
        </div>
        <div className="ment">댓글</div>
      </div>
    </Container>
  );
};
