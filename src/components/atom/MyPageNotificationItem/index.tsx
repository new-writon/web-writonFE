import { useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// import { getTemplete } from "@/apis/DetailPage";
import { patchNotificationComment, patchNotificationLike } from "@/apis/notification";
import commentIcon from "@/assets/DetailPage/comment.svg";
import fireIcon from "@/assets/DetailPage/fireOff.svg";
import {
  // DetailDataState,
  DetailModalState,
  // LikeState,
  detailTemplateIdState,
} from "@/recoil/atoms";
import { notificationDataType } from "@/types";

import { Container, ContainerMobile, First, Second, Third } from "./style";

export const MyPageNotificationItem = ({ data }: { data: notificationDataType }) => {
  // const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  // const setLikeCount = useSetRecoilState(LikeState);

  const setDetailTemplateId = useSetRecoilState(detailTemplateIdState);

  const [click, setClick] = useState<boolean>(false);

  const spaceToDetail = async (type: string, Id: number) => {
    // const response = await getTemplete(
    //   localStorage.getItem("organization") || "",
    //   Number(data?.userTemplateId),
    //   true
    // );
    // setDetailData(response);
    // setLikeCount(response[0]?.likeCount);
    setDetailTemplateId(data?.userTemplateId);
    setDetailModal(true);
    setClick(true);
    document.body.style.overflowY = "hidden";
    if (type === "like") {
      try {
        await patchNotificationLike(Id);
      } catch {
        new Error("shit");
      }
    } else if (type === "comment") {
      try {
        await patchNotificationComment(Id);
      } catch {
        new Error("shit");
      }
    }
  };
  return (
    <Container
      onClick={() => spaceToDetail(data?.type, data?.commentId || data?.likeId || 0)}
      $click={data?.sign === 1 ? true : data?.sign === 0 && click === true ? true : false}
    >
      <First>
        <img
          src={data?.type === "comment" ? commentIcon : fireIcon}
          alt="c"
        />
      </First>
      <Second>
        <div className="notification-title">
          <div className="data">{data?.nickname}</div>님이&nbsp;
          <div className="data">{format(data?.templateName, "M월 dd일 회고")}</div>에{" "}
          {data?.type === "comment" ? "댓글을 남겼어요." : "응원을 보냈어요."}
        </div>
        <div className="comment-text">
          {data?.type === "comment" ? data?.content : "아자아자! 라이톤 팀도 응원해요"}
        </div>
      </Second>
      <Third>
        <div className="date">{format(data?.createdAt, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
      </Third>
    </Container>
  );
};

export const MyPageNotificationItemMobile = ({ data }: { data: notificationDataType }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState<boolean>(false);

  const spaceToDetail = async (type: string, Id: number) => {
    navigate(`/detail/${data?.userTemplateId}?type=my`);
    setClick(true);
    if (type === "like") {
      try {
        await patchNotificationLike(Id);
      } catch {
        new Error("shit");
      }
    } else if (type === "comment") {
      try {
        await patchNotificationComment(Id);
      } catch {
        new Error("shit");
      }
    }
  };
  return (
    <ContainerMobile
      onClick={() => spaceToDetail(data?.type, data?.commentId || data?.likeId || 0)}
      $click={data?.sign === 1 ? true : data?.sign === 0 && click === true ? true : false}
    >
      <div className="first">
        <img
          src={data?.type === "comment" ? commentIcon : fireIcon}
          alt="c"
        />
      </div>
      <div className="second">
        <div className="notification-title">
          <div className="data">{data?.nickname}</div>님이&nbsp;
          <div className="data">{format(data?.templateName, "M월 dd일 회고")}</div>에{" "}
          {data?.type === "comment" ? "댓글을 남겼어요." : "응원을 보냈어요."}
        </div>
        <div className="comment-text">
          {data?.type === "comment" ? data?.content : "아자아자! 라이톤 팀도 응원해요"}
        </div>
        <div className="date">{format(data?.createdAt, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
      </div>
    </ContainerMobile>
  );
};
