import { useState } from "react";

import { CommentPost } from "../CommentPost";
import { UserInfoDetail } from "../UserInfoDetail";

import { Container } from "./style";

const data = {
  affiliation_id: null,
  category: "베이직 질문",
  commentCount: "0",
  company: "라이톤",
  company_public: 1,
  content: "네??",
  created_at: "2024-01-04T00:00:00.000Z",
  job: "프론트엔드",
  likeCount: "0",
  myLikeSign: "0",
  nickname: "호연호연",
  profile: "http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg",
  question: "얌마?",
  question_content_id: 1,
  question_id: 1,
  user_templete_id: 1,
};

export const CommentItem = () => {
  const [replyWriteOn, setReplyWriteOn] = useState<boolean>(false);
  const [replyReadOn, setReplyReadOn] = useState<boolean>(false);

  return (
    <Container>
      <UserInfoDetail data={data} />
      <div className="comment-text">
        efiwejhfieqwhgfeqrhgerhg8rehg8erhg8erhg8erhgerhgregjreghreghriughreiughrgiurhgreiughreuighgiurehgreigh
      </div>
      <div className="replyBox">
        <div className="reply">
          <div
            className="replyWrite"
            onClick={() => setReplyWriteOn(!replyWriteOn)}
          >
            답글 달기
          </div>
          <div
            className="replyRead"
            onClick={() => setReplyReadOn(!replyReadOn)}
          >
            {replyReadOn ? "답글 숨기기" : `답글 ${0}개`}
          </div>
        </div>
        {replyWriteOn && <CommentPost />}
        {replyReadOn && (
          <div className="replylist">
            <div>
              <UserInfoDetail data={data} />
              <div className="comment-text">
                efiwejhfieqwhgfeqrhgerhg8rehg8erhg8erhg8erhgerhgregjreghreghriughreiughrgiurhgreiughreuighgiurehgreigh
              </div>
            </div>
            <div>
              <UserInfoDetail data={data} />
              <div className="comment-text">
                efiwejhfieqwhgfeqrhgerhg8rehg8erhg8erhg8erhgerhgregjreghreghriughreiughrgiurhgreiughreuighgiurehgreigh
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
