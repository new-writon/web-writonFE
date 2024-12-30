import { format } from "date-fns";
import { ko } from "date-fns/locale";
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

import { Container, ContainerMobile } from "./style";

export const MyPageRetrospectItem = ({ data }: { data: communityContentProps[] }) => {
  // const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  // const setLikeCount = useSetRecoilState(LikeState);
  const setDetailTemplateId = useSetRecoilState(detailTemplateIdState);

  const spaceToDetail = () => {
    // setDetailData(data);
    // setLikeCount(data[0]?.likeCount);
    setDetailTemplateId(data[0].userTemplateId);
    setDetailModal(true);
    document.body.style.overflowY = "hidden";
  };

  return (
    <Container onClick={spaceToDetail}>
      <div className="date"> {format(data[0]?.createdAt, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
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

  const spaceToDetail = () => {
    navigate(`/detail/${data[0].userTemplateId}?type=my`);
  };

  return (
    <ContainerMobile onClick={spaceToDetail}>
      <div className="top">
        <div className="date">{format(data[0]?.createdAt, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
        <CommentAndLike
          commentCount={data[0]?.commentCount}
          likeCount={data[0]?.likeCount}
        ></CommentAndLike>
      </div>
      <div className="text">{data[0]?.content}</div>
    </ContainerMobile>
  );
};
