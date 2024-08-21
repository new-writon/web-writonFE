import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    setReplyArray(data?.reply);
  }, [data?.reply]);
  return (
    <Container>
      <UserInfoDetail
        data={{
          profile: data?.profile,
          nickname: data?.nickname,
          position: data?.position,
          company: data?.company,
          createdAt: data?.createdAt,
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
            commentGroup={Number(data?.commentId)} //commnet_id
            replyArray={replyArray}
            setReplyArray={setReplyArray}
            type="reply"
            setReplyReadOn={setReplyReadOn}
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
                      position: item.position,
                      company: item.company,
                      createdAt: item.createdAt,
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
