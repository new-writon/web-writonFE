import profile from "@/assets/communityPage/profile.png";
import { communityStoryProps } from "@/types";

import { Container } from "./style";

export const StoryItem = ({
  data,
  someone,
  onClick,
}: {
  data: communityStoryProps | undefined;
  someone: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void | undefined;
}) => {
  return (
    <Container
      $someone={someone}
      $message={data?.cheering_phrase}
    >
      {someone === "me" ? (
        data?.cheering_phrase === null ? (
          <div className="storyMessage">오늘의 한마디 +</div>
        ) : (
          <div className="storyMessage">{data?.cheering_phrase}</div>
        )
      ) : (
        <div className="storyMessage">{data?.cheering_phrase}</div>
      )}
      <div className="profileBox">
        <div
          className="profileImageCover"
          onClick={onClick}
        >
          <img
            src={data?.profile || profile} //{data?.profile}
            alt="profile"
          />
        </div>
        <div className="job">{data?.job}</div>
        <div className="company">{data?.company || "비공개"}</div>
      </div>
      {/* <div className="introducePopup">
        <div className="userInfo"></div>
        <div className="oneline">{data?.oneline}</div>
      </div> */}
    </Container>
  );
};
