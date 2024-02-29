import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { DetailDataState, DetailModalState, LikeState } from "@/recoil/atoms";
import { communityContentProps } from "@/types";

import { CommentAndLike } from "../CommentAndLike";

import { Container, ContainerMobile } from "./style";

export const MyPageRetrospectItem = ({ data }: { data: communityContentProps[] }) => {
  const navigate = useNavigate();
  const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const setLikeCount = useSetRecoilState(LikeState);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const spaceToDetail = () => {
    if (width <= 530) {
      navigate(`/detail/${data[0].user_templete_id}?type=my`);
      // setDetailData(data);
      // setLikeCount(data[0]?.likeCount);
    } else {
      setDetailData(data);
      setLikeCount(data[0]?.likeCount);
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
      <div className="date"> {format(data[0]?.created_at, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
      <div className="text">{data[0]?.content}</div>
      <CommentAndLike
        commentCount={data[0]?.commentCount}
        likeCount={data[0]?.likeCount}
      ></CommentAndLike>
    </Container>
  );
};

export const MyPageRetrospectItemMobile = ({ data }: { data: communityContentProps[] }) => {
  const navigate = useNavigate();
  const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const setLikeCount = useSetRecoilState(LikeState);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const spaceToDetail = () => {
    if (width <= 530) {
      navigate(`/detail/${data[0].user_templete_id}?type=my`);
      // setDetailData(data);
      // setLikeCount(data[0]?.likeCount);
    } else {
      setDetailData(data);
      setLikeCount(data[0]?.likeCount);
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
    <ContainerMobile onClick={spaceToDetail}>
      <div className="top">
        <div className="date">
          {format(data[0]?.created_at, "yyyy.MM.dd (EEE)", { locale: ko })}
        </div>
        <CommentAndLike
          commentCount={data[0]?.commentCount}
          likeCount={data[0]?.likeCount}
        ></CommentAndLike>
      </div>
      <div className="text">{data[0]?.content}</div>
    </ContainerMobile>
  );
};
