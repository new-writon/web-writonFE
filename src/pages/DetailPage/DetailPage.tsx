/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getComment, getTemplete } from "@/apis/DetailPage";
import { CommentBox } from "@/components/DetailPage/CommentBox";
import { WriteView } from "@/components/DetailPage/WriteView";
import { CommentAndLike } from "@/components/atom/CommentAndLike";
import { CommnetAndLikeFloating } from "@/components/atom/CommentAndLikeFloating";
import { UserInfoDetail } from "@/components/atom/UserInfoDetail";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { CommentState, DetailDataState, DetailModalState, LikeState } from "@/recoil/atoms";
import { Inner } from "@/style/global";

export const DetailPage = () => {
  const { templeteId } = useParams();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [detailData, setDetailData] = useRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const [likeCount, setLikeCount] = useRecoilState(LikeState);
  const [commentList, setCommentList] = useRecoilState(CommentState);
  const executeAsyncTask = useAsyncWithLoading();

  const defaultClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
  };

  const DetailPageRendering = async () => {
    executeAsyncTask(async () => {
      if (width <= 530) {
        try {
          const data = await Promise.all([
            getTemplete(localStorage.getItem("organization") || "", Number(templeteId), true),
            getComment(Number(templeteId)),
          ]);
          setDetailData(data[0]);
          setCommentList(data[1]);
          setLikeCount(data[0][0]?.likeCount);
        } catch {
          new Error("shit");
        }
      } else {
        try {
          const data = await getComment(detailData[0]?.user_templete_id);
          setCommentList(data);
        } catch {
          new Error("shit");
        }
      }
    });
  };

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  useEffect(() => {
    DetailPageRendering();
  }, []);

  if (detailData.length === 0) {
    return <></>;
  }

  return (
    <Inner>
      <Container
        id="DetailBox"
        onClick={() => {
          setDetailModal(false);
          document.body.style.overflowY = "auto";
        }}
      >
        <div
          className="DetailBox"
          onClick={(e) => defaultClick(e)}
        >
          <WriteView detailData={detailData} />
          <div className="WriterUser">
            <UserInfoDetail
              data={{
                profile: detailData[0]?.profile,
                nickname: detailData[0]?.nickname,
                job: detailData[0]?.job,
                company: detailData[0]?.company,
                created_at: detailData[0]?.created_at,
              }}
            />
            <CommentAndLike
              commentCount={detailData[0]?.commentCount}
              likeCount={likeCount}
            />
          </div>
          <CommentBox
            commentList={commentList}
            commentCount={detailData[0]?.commentCount}
            userTemplateId={detailData[0]?.user_templete_id} //
          />
          <CommnetAndLikeFloating
            userTemplateId={detailData[0]?.user_templete_id}
            myLikeSign={detailData[0]?.myLikeSign}
            commentCount={detailData[0]?.commentCount}
            likeCount={likeCount}
          />
        </div>
      </Container>
    </Inner>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  padding: 140px 30px 254px;

  .DetailBox {
    padding: 60px 90px 90px;
    background-color: var(--White);
    border-radius: 16px;
    height: fit-content;
    width: 60.15%;
    min-width: 830px;
    max-width: 830px;
    @media (max-width: 990px) {
      // 기존 830px
      width: 80.15%;
      min-width: 530px;
    }

    position: relative;
  }
  .WriterUser {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid #d9d9d9;
  }

  @media (max-width: 530px) {
    position: relative;
    background: none;
    padding: 0;
    overflow-x: hidden;
    height: auto;
    z-index: 0;
    .DetailBox {
      padding: 20px 0 260px;
      min-width: 343px;
      width: 100%;
    }
  }
`;
