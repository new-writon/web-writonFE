import comment from "@/assets/communityPage/Comment.svg";
import like from "@/assets/communityPage/like.svg";

import { Container, Item } from "./style";
export const CommentAndLike = ({
  commentCount,
  likeCount,
}: {
  commentCount: number;
  likeCount: number;
}) => {
  return (
    <Container>
      <Item>
        <img
          src={comment}
          alt="댓글"
        />
        <div className="number">{commentCount}</div>
      </Item>
      <Item>
        <img
          src={like}
          alt="좋아요"
        />
        <div className="number">{likeCount}</div>
      </Item>
    </Container>
  );
};