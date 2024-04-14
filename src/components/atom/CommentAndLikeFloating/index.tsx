/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { getCommunityContentData } from "@/apis/CommunityPage";
import { postLike, postLikeDelete } from "@/apis/DetailPage";
import comment from "@/assets/DetailPage/comment.svg";
import fireOff from "@/assets/DetailPage/fireOff.svg";
import fireOn from "@/assets/DetailPage/fireOn.svg";
import { CommunitySecondDataState, LikeState } from "@/recoil/atoms";
import { communitySecondCoponentType } from "@/types";

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
  const setCommunitySecondData =
    useSetRecoilState<communitySecondCoponentType>(CommunitySecondDataState);

  const LikeFunc = async () => {
    if (!IsClick) {
      // 클릭 아직 안했을 때 좋아요수 변경 +1
      await postLike(userTemplateId, localStorage.getItem("organization") || "letsintern");
      setLikeCount((Number(likeCount) + 1).toString());
      setIsCick(true);
      setIsHover(true);
    } else {
      await postLikeDelete(userTemplateId, localStorage.getItem("organization") || "letsintern");
      setLikeCount((Number(likeCount) - 1).toString());
      setIsCick(false);
      setIsHover(false);
    }
    try {
      const result = await getCommunityContentData(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1",
        localStorage.getItem("date") || ""
      );
      setCommunitySecondData(result); // 밖에 커뮤니티 데이터 수정
    } catch {
      new Error("shit");
    }
  };

  useEffect(() => {
    if (myLikeSign === "1") {
      setIsCick(true);
    } else if (myLikeSign === "0") {
      setIsCick(false);
    }
  }, [myLikeSign, setIsCick]);
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
