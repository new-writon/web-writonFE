import profile from "@/assets/communityPage/profile.png";
import { StoryItemProps } from "@/types";

import { Container } from "./style";

export const StoryItem = ({
  data,
  someone,
  onClick,
}: {
  data: StoryItemProps;
  someone: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <Container $someone={someone}>
      <div className="storyMessage">{data?.message}</div>
      <div
        className="profileImageCover"
        onClick={onClick}
      >
        <img
          src={profile} //{data?.profile}
          alt="profile"
        />
      </div>
      <div className="job">{data?.job}</div>
      <div className="company">{data?.company}</div>
      {/* <div className="introducePopup">
        <div className="userInfo"></div>
        <div className="oneline">{data?.oneline}</div>
      </div> */}
    </Container>
  );
};
