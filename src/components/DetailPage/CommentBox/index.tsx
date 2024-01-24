import { useState } from "react";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { CommentItem } from "@/components/atom/CommentItem";
import { CommentPost } from "@/components/atom/CommentPost";

import { Container } from "./style";
export const CommentBox = () => {
  const [commentOn, setCommentOn] = useState<boolean>(false);

  return (
    <Container>
      <CommentPost />
      <div
        className="commentNum"
        onClick={() => setCommentOn(!commentOn)}
      >
        댓글 99개
        <img
          src={commentOn ? topArrow : downArrow}
          alt="V"
        />
      </div>
      {commentOn && (
        <div className="commentList">
          <CommentItem />
        </div>
      )}
    </Container>
  );
};
