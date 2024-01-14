import React from "react";

import { CommunityItemProps } from "@/types";

import { CommentAndLike } from "../CommentAndLike";
import { UserInfo } from "../UserInfo";

import { Container, PreviewBody, PreviewInfo } from "./style";

export const CommunityItem = ({ data }: { data: CommunityItemProps }) => {
  return (
    <Container>
      <PreviewBody>
        {data?.preview.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="previewItem">
              <div className="question">{item?.question}</div>
              <div className="content">{item?.content}</div>
            </div>
          </React.Fragment>
        ))}
      </PreviewBody>
      <PreviewInfo>
        <UserInfo data={data?.user}></UserInfo>
        <CommentAndLike
          commentCount={data?.comment}
          likeCount={data?.likeCount}
        ></CommentAndLike>
      </PreviewInfo>
    </Container>
  );
};
