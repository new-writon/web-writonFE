import React from "react";

import { communityContentProps } from "@/types";

import { CommentAndLike } from "../CommentAndLike";
import { UserInfo } from "../UserInfo";

import { Container, PreviewBody, PreviewInfo } from "./style";

export const CommunityItem = ({ data }: { data: communityContentProps[] }) => {
  return (
    <Container>
      <PreviewBody>
        {data?.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="previewItem">
              <div className="question">{item?.question}</div>
              <div className="content">{item?.content}</div>
            </div>
          </React.Fragment>
        ))}
      </PreviewBody>
      <PreviewInfo>
        <UserInfo
          data={{
            name: data[0]?.nickname,
            job: data[0]?.job,
            company: data[0]?.company,
            profile: data[0]?.profile,
          }}
        ></UserInfo>
        <CommentAndLike
          commentCount={data[0]?.commentCount}
          likeCount={data[0]?.likeCount}
        ></CommentAndLike>
      </PreviewInfo>
    </Container>
  );
};
