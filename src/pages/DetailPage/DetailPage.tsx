import { MouseEvent, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";

import { CommentBox } from "@/components/DetailPage/CommentBox";
import { WriteView } from "@/components/DetailPage/WriteView";
import { CommentAndLike } from "@/components/atom/CommentAndLike";
import { CommnetAndLikeFloating } from "@/components/atom/CommentAndLikeFloating";
import { UserInfoDetail } from "@/components/atom/UserInfoDetail";
import {
  CommentState,
  // DetailDataState,
  DetailModalState,
  LikeState,
  detailTemplateIdState,
  likePeopleDataState,
  modalBackgroundState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import {
  useGetComments,
  useGetDetailData,
  useGetLikePeople,
  useGetMyInfo,
} from "@/hooks/reactQueryHooks/useMainHooks";
import useWindowWidth from "@/hooks/useWindowWidth";
import MobileLikePeopleButton from "@/components/atom/MobileLikePeopleButton/MobileLikePeopleButton";
import { communityContentProps } from "@/types";

const DetailPage = () => {
  const { templateId } = useParams<{ templateId: string }>();

  const recoilTemplateId = useRecoilValue(detailTemplateIdState);
  const type = new URL(window.location.href).searchParams.get("type") || "";
  const [detailData, setDetailData] = useState<communityContentProps[]>([]);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const [BackgroundModal, setBackgroundModal] = useRecoilState(modalBackgroundState);
  const [likeCount, setLikeCount] = useRecoilState(LikeState);
  const [commentList, setCommentList] = useRecoilState(CommentState);
  const setLikePeopleData = useSetRecoilState(likePeopleDataState);

  const width = useWindowWidth();

  const [nickName, setNickName] = useState<string>(""); // 내가 쓴 글인지 타인의 글을 누르고 들어간건지 비교하기 위해서

  const defaultClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
  };

  // 모바일 + 데스크탑 화면일 때 다른 객체값 가지고 들어가서 요청
  // detailData의 templateId 또는 params의 templateId를 사용하여 댓글 데이터 가져오기
  const currentTemplateId = width > 530 ? recoilTemplateId : Number(templateId);
  // react-query 사용

  const { data: temporaryDetailData = [] } = useGetDetailData({
    organization: localStorage.getItem("organization") as string,
    challengeId: localStorage.getItem("challengeId") as string,
    templateId: currentTemplateId,
    type,
  });

  const { data: commentsData } = useGetComments({
    organization: localStorage.getItem("organization") as string,
    templateId: currentTemplateId,
  });

  const { data: likePeopleData } = useGetLikePeople(currentTemplateId);

  // 모바일 + 데스크탑 관계 없이 데이터 가져옴
  const { data: myInfo } = useGetMyInfo(localStorage.getItem("organization") as string);
  // Fetch and update like count and nickname
  useEffect(() => {
    if (detailData && myInfo) {
      setNickName(myInfo.nickname);
      setLikeCount(detailData[0]?.likeCount || "0");
      setCommentList(commentsData || []);
    }
  }, [myInfo, commentsData, detailData]);

  useEffect(() => {
    if (temporaryDetailData.length > 0) {
      setDetailData(temporaryDetailData);
    }
  }, [temporaryDetailData]);

  if (detailData.length === 0) {
    return <></>;
  }

  return (
    <Inner>
      <Container
        $width={width}
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
          <WriteView
            detailData={detailData}
            nickName={nickName}
          />
          <div className="WriterUser">
            <UserInfoDetail
              data={{
                profile: detailData[0]?.profile,
                nickname: detailData[0]?.nickname,
                position: detailData[0]?.position,
                company: detailData[0]?.company,
                createdAt: detailData[0]?.createdAt,
              }}
            />
            {width <= 530 ? (
              <MobileLikePeopleButton
                likeCount={likeCount}
                onPress={() => {
                  setBackgroundModal({ ...BackgroundModal, likePeopleModal: true });
                  setLikePeopleData(likePeopleData || []);
                }}
              />
            ) : (
              <CommentAndLike
                commentCount={detailData[0]?.commentCount}
                likeCount={likeCount}
              />
            )}
          </div>
          <CommentBox
            commentList={commentList}
            commentCount={detailData[0]?.commentCount}
            userTemplateId={detailData[0]?.userTemplateId} //
          />
          <CommnetAndLikeFloating
            userTemplateId={detailData[0]?.userTemplateId}
            myLikeSign={detailData[0]?.myLikeSign}
            commentCount={detailData[0]?.commentCount}
            likeCount={likeCount}
            likePeopleData={likePeopleData || []}
          />
        </div>
      </Container>
    </Inner>
  );
};

export default DetailPage;

const fadeIn = keyframes`
from {
  opacity: 0;
  transform:scale(0.9);
}
to {
  opacity: 1;
  transform:scale(1);

}
`;

const Container = styled.div<{ $width: number }>`
  position: fixed;
  top: 0;
  left: 0;
  height: ${(props) => (props.$width <= 530 ? "calc(var(--vh, 1vh) * 100)" : "100vh")};
  /* height: 100vh;
  height: calc(var(--vh, 1vh) * 100); */
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
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
    animation: ${fadeIn} 400ms;
  }

  .WriterUser {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--Gray-40, #d2d5db);
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
