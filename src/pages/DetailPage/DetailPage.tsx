import { MouseEvent } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { CommentBox } from "@/components/DetailPage/CommentBox";
import { WriteView } from "@/components/DetailPage/WriteView";
import { CommentAndLike } from "@/components/atom/CommentAndLike";
import { CommnetAndLikeFloating } from "@/components/atom/CommentAndLikeFloating";
import { UserInfoDetail } from "@/components/atom/UserInfoDetail";
import { DetailDataState, DetailModalState } from "@/recoil/atoms";

export const DetailPage = () => {
  const detailData = useRecoilValue(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const defaultClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
  };
  return (
    <Container onClick={() => setDetailModal(false)}>
      <div
        className="DetailBox"
        onClick={(e) => defaultClick(e)}
      >
        <WriteView detailData={detailData} />
        <div className="WriterUser">
          <UserInfoDetail data={detailData[0]} />
          <CommentAndLike
            commentCount={detailData[0]?.commentCount}
            likeCount={detailData[0]?.likeCount}
          />
        </div>
        <CommentBox />
        <CommnetAndLikeFloating />
      </div>
    </Container>
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
    @media (max-width: 830px) {
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
`;
