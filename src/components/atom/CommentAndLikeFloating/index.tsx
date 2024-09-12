import { useState } from "react";

import { useSetRecoilState } from "recoil";

import comment from "@/assets/DetailPage/comment.svg";
import fireOff from "@/assets/DetailPage/fireOff.svg";
import fireOn from "@/assets/DetailPage/fireOn.svg";
import { LikeState } from "@/recoil/atoms";

import { Container } from "./style";
import { useLikeMutation, useUnlikeMutation } from "@/hooks/reactQueryHooks/useMainHooks";

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
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(myLikeSign === "1");
  const setLikeCount = useSetRecoilState(LikeState); // 프론트에서 좋아요 수를 바로 업데이트하기 위해 사용

  const { mutate: likeMutate } = useLikeMutation();
  const { mutate: unlikeMutate } = useUnlikeMutation();

  const handleLikeClick = () => {
    if (!isClick) {
      // 좋아요 추가
      likeMutate({ userTemplateId, organization: localStorage.getItem("organization") as string });
      setLikeCount((Number(likeCount) + 1).toString());
    } else {
      // 좋아요 취소
      unlikeMutate({
        userTemplateId,
        organization: localStorage.getItem("organization") as string,
      });
      setLikeCount((Number(likeCount) - 1).toString());
    }
    setIsClick(!isClick);
  };

  return (
    <Container>
      <div className="Box">
        <div
          className={`likeBox round ${isHover && "hover"}  ${isClick && "click"}`}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          onClick={handleLikeClick}
        >
          <img
            src={isClick ? fireOn : isHover ? fireOn : fireOff}
            alt="fire"
          />
          <div className="num">{likeCount}</div>
        </div>
        <div className="ment">응원해요</div>
      </div>
      <div className="Box">
        <a href="#comment">
          <div className="commentBox round">
            <img
              src={comment}
              alt="fire"
            />
            <div className="num">{commentCount}</div>
          </div>
        </a>
        <div className="ment">댓글</div>
      </div>
    </Container>
  );
};
