import profile from "@/assets/communityPage/profile.png";
import { agoraCommentType } from "@/types";

import { MyContainer, OtherContainer } from "./style";

export const AgoraChatOtherItem = ({ type, data }: { type?: string; data: agoraCommentType }) => {
  return (
    <OtherContainer $type={type}>
      <div className="profileImageCover">
        <img
          src={data?.profile || profile} //{data?.profile}
          alt="profile"
        />
      </div>
      <div className="chat-box">
        <span className="nickname">{data?.nickname}</span>
        <div className="chat">{data?.content}</div>
      </div>
      <div className="time">{data?.createdTime}</div>
    </OtherContainer>
  );
};

export const AgoraChatMyItem = ({ data }: { data: agoraCommentType }) => {
  return (
    <MyContainer>
      <div className="time">{data?.createdTime}</div>
      <div className="chat-box">
        <span className="nickname">{data?.nickname}</span>
        <div className="chat">{data?.content}</div>
      </div>
    </MyContainer>
  );
};
