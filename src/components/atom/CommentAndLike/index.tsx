import Comment_blue from "@/assets/communityPage/Comment_blue.svg";
import Comment_purple from "@/assets/communityPage/Comment_purple.svg";
import like_blue from "@/assets/communityPage/like_blue.svg";
import like_purple from "@/assets/communityPage/like_purple.svg";

import { Container, Item } from "./style";
export const CommentAndLike = ({
  commentCount,
  likeCount,
}: {
  commentCount: string;
  likeCount: string;
}) => {
  return (
    <Container className="commentAndLike">
      <Item>
        <img
          src={localStorage.getItem("challengeId") !== "1" ? Comment_purple : Comment_blue}
          alt="댓글"
        />
        <div className="number">{commentCount}</div>
      </Item>
      <Item>
        <img
          src={localStorage.getItem("challengeId") !== "1" ? like_purple : like_blue}
          alt="좋아요"
        />
        <div className="number">{likeCount}</div>
      </Item>
    </Container>
  );
};
