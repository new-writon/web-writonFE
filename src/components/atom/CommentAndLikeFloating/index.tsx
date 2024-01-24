import { useState } from "react";

import comment from "@/assets/DetailPage/comment.svg";
import fireOff from "@/assets/DetailPage/fireOff.svg";
import fireOn from "@/assets/DetailPage/fireOn.svg";

import { Container } from "./style";

export const CommnetAndLikeFloating = () => {
  const [IsHover, setIsHover] = useState<boolean>(false);
  const [IsClick, setIsCick] = useState<boolean>(false);

  const LikeFunc = () => {
    setIsCick(!IsClick);
  };
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
          <div className="num">{1}</div>
        </div>
        <div className="ment">응원해요</div>
      </div>
      <div className="Box">
        <div className="commentBox round">
          <img
            src={comment}
            alt="fire"
          />
          <div className="num">{1}</div>
        </div>
        <div className="ment">댓글</div>
      </div>
    </Container>
  );
};
