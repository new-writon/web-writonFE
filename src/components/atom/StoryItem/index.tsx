import profile from "@/assets/communityPage/profile.png";
import { StoryItemProps } from "@/types";

import { Container } from "./style";

export const StoryItem = ({ data, someone }: { data: StoryItemProps; someone: string }) => {
  return (
    <Container $someone={someone}>
      <div className="storyMessage">{data?.message}</div>
      <div className="profileImageCover">
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
