import React, { useState } from "react";

import { commentProps } from "@/types";

import { CommentPost } from "../CommentPost";
import { UserInfoDetail } from "../UserInfoDetail";

import { Container } from "./style";

export const CommentItem = ({
  userTemplateId,
  data,
}: {
  userTemplateId: number;
  data: commentProps;
}) => {
  const [replyWriteOn, setReplyWriteOn] = useState<boolean>(false);
  const [replyReadOn, setReplyReadOn] = useState<boolean>(false);
  const [replyArray, setReplyArray] = useState<commentProps[]>(data?.reply); // 초기값으로 들어온 Reply data 넣기
  //reply 배열 들어오면 useState로 관리하고 있다.
  // CommentPost 딴에서 commentGroup이 null값이 아닌 string이 들어오면 setState 배열 보내서 없데이트하기
  // 그리고 여기 딴에서 state로 배열 뿌려주기 하니까 자동 없데이트

  return (
    <Container>
      <UserInfoDetail
        data={{
          profile: data?.profile,
          nickname: data?.nickname,
          job: data?.job,
          company: data?.company,
          created_at: data?.created_at,
        }}
      />
      <div className="comment-text">{data?.content}</div>
      <div className="replyBox">
        <div className="reply">
          <div
            className="replyWrite"
            onClick={() => setReplyWriteOn(!replyWriteOn)}
          >
            답글 달기
          </div>
          <div
            className={replyArray.length > 0 ? "replyRead" : ""}
            onClick={() => setReplyReadOn(!replyReadOn)}
          >
            {replyArray.length > 0
              ? replyReadOn
                ? "답글 숨기기"
                : `답글 ${replyArray.length} 개`
              : ""}
          </div>
        </div>
        {replyWriteOn && (
          <CommentPost
            userTemplateId={userTemplateId}
            commentGroup={Number(data?.comment_id)} //commnet_id
            replyArray={replyArray}
            setReplyArray={setReplyArray}
          />
        )}
        {replyReadOn && replyArray.length > 0 ? (
          <div className="replylist">
            {replyArray?.map((item, idx) => (
              <React.Fragment key={idx}>
                <div>
                  <UserInfoDetail
                    data={{
                      profile: item.profile,
                      nickname: item.nickname,
                      job: item.job,
                      company: item.company,
                      created_at: item.created_at,
                    }}
                  />
                  <div className="comment-text">{item?.content}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};
