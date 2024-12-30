import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  // DetailDataState,
  DetailModalState,
  // LikeState,
  detailTemplateIdState,
} from "@/recoil/atoms";
import { communityContentProps } from "@/types";

import { CommentAndLike } from "../CommentAndLike";
import { UserInfo } from "../UserInfo";

import { Container, PreviewBody, PreviewInfo } from "./style";

export const CommunityItem = ({ data }: { data: communityContentProps[] }) => {
  // const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  // const setLikeCount = useSetRecoilState(LikeState);
  const setDetailTemplateId = useSetRecoilState(detailTemplateIdState);

  const [width, setWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();
  const spaceToDetail = () => {
    if (width <= 530) {
      navigate(`/detail/${data[0].userTemplateId}`);
      // setDetailData(data);
      // setLikeCount(data[0]?.likeCount);
    } else {
      // setDetailData(data);
      // setLikeCount(data[0]?.likeCount);
      setDetailTemplateId(data[0].userTemplateId);

      setDetailModal(true);
      document.body.style.overflowY = "hidden";
    }
  };

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  return (
    <Container onClick={spaceToDetail}>
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
            position: data[0]?.position,
            company: data[0]?.company,
            profile: data[0]?.profile,
            date: data[0]?.createdAt,
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
