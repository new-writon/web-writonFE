import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// import { getTemplete } from "@/apis/DetailPage";
import {
  // DetailDataState,
  DetailModalState,
  // LikeState,
  detailTemplateIdState,
} from "@/recoil/atoms";
import { myPageCommentType } from "@/types";

import { Bottom, Container, ContainerMobile, Top } from "./style";

export const MyPageCommentItem = ({ data }: { data: myPageCommentType }) => {
  // const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  // const setLikeCount = useSetRecoilState(LikeState);
  const setDetailTemplateId = useSetRecoilState(detailTemplateIdState);

  const spaceToDetail = async () => {
    // try {
    // const response = await getTemplete(
    //   localStorage.getItem("organization") || "",
    //   Number(data?.userTemplateId),
    //   true
    // );
    // setDetailData(response);
    // setLikeCount(response[0]?.likeCount);
    setDetailTemplateId(data?.userTemplateId);
    setDetailModal(true);
    document.body.style.overflowY = "hidden";
    // } catch {
    //   new Error("shit");
    // }
  };

  return (
    <Container onClick={spaceToDetail}>
      <Top>
        <div className="text">{data?.content}</div>
        <div className="date">
          {format(data?.commentCreateAt, "yyyy.MM.dd (EEE)", { locale: ko })}
        </div>
      </Top>
      <Bottom>
        <div className="writing">
          <div className="title">원문</div>
          <div className="sentence">{format(data?.userTemplateFinishedAt, "MM월 dd일 회고")}</div>
        </div>
        <div className="userName">
          <div className="title">작성자</div>
          <div className="sentence">{data?.writorNickname}</div>
        </div>
      </Bottom>
    </Container>
  );
};

export const MyPageCommentItemMobile = ({ data }: { data: myPageCommentType }) => {
  const navigate = useNavigate();

  const spaceToDetail = () => {
    navigate(`/detail/${data?.userTemplateId}?type=my`);
  };
  return (
    <ContainerMobile onClick={spaceToDetail}>
      <div className="text">{data?.content}</div>
      <div className="bottom">
        <div className="writing">
          <div className="title">원문</div>
          <div className="sentence">{format(data?.userTemplateFinishedAt, "MM월 dd일 회고")}</div>
        </div>
        <div className="userName">
          <div className="title">작성자</div>
          <div className="sentence">{data?.writorNickname}</div>
        </div>
      </div>
      <div className="date">
        {format(data?.commentCreateAt, "yyyy.MM.dd (EEE)", { locale: ko })}
      </div>
    </ContainerMobile>
  );
};
