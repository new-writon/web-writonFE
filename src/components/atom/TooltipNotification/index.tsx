import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { getTemplete } from "@/apis/DetailPage";
import { patchNotificationComment, patchNotificationLike } from "@/apis/notification";
import commentIcon from "@/assets/DetailPage/comment.svg";
import fireIcon from "@/assets/DetailPage/fireOff.svg";
import arrow from "@/assets/header/rightArrow.svg";
import gradient from "@/assets/notification/background-gradient.svg";
import { DetailDataState, DetailModalState, LikeState } from "@/recoil/atoms";
import { notificationDataType } from "@/types";

import { Container, ItemContainer } from "./style";
export const TooltipNotification = ({
  data,
  setNotificationTooltip,
  type,
}: {
  data: notificationDataType[];
  setNotificationTooltip?: (notificationTooltip: boolean) => void | undefined;
  type: string;
}) => {
  const navigate = useNavigate();
  const [gradientOn, setGradientOn] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        const windowHeight = window.innerHeight - 130; // 뷰포트 높이에서 120px를 뺌

        if (scrollHeight > windowHeight) {
          setGradientOn(false);
        }
        const isAtBottom = scrollTop + clientHeight > scrollHeight - 20;
        if (isAtBottom) {
          setGradientOn(true);
        }
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [listRef]);
  return (
    <Container>
      {type === "web" ? (
        <div className="notification-list">
          {data?.map((item, idx) => (
            <React.Fragment key={idx}>
              <TooltipNotificationItem data={item} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="notification-wrapper">
          <div
            className="notification-list"
            ref={listRef}
          >
            {data?.map((item, idx) => (
              <React.Fragment key={idx}>
                <TooltipNotificationItem data={item} />
              </React.Fragment>
            ))}
          </div>
          <div className={`gradient ${gradientOn ? "gradient-on" : ""}`}>
            <img
              src={gradient}
              alt=""
            />
          </div>
        </div>
      )}
      <div
        className="notification-add"
        onClick={() => {
          if (type === "web") {
            navigate("/mypage?category=알림");
          } else {
            navigate("/mypageMobile?category=알림");
          }
          if (setNotificationTooltip) {
            setNotificationTooltip(false);
          }
        }}
      >
        <p>알림 더보기</p>
        <img
          src={arrow}
          alt=">"
        />
      </div>
    </Container>
  );
};

export const TooltipNotificationItem = ({ data }: { data: notificationDataType }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [click, setClick] = useState<boolean>(false);

  const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const setLikeCount = useSetRecoilState(LikeState);

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);

  const spaceToDetail = async (type: string, Id: number) => {
    if (width < 531) {
      navigate(`/detail/${data?.userTempleteId}`);
      setClick(true);
      if (type === "like") {
        try {
          const res = await patchNotificationLike(Id);
          console.log(res);
        } catch {
          new Error("shit");
        }
      } else if (type === "comment") {
        try {
          const res = await patchNotificationComment(Id);
          console.log(res);
        } catch {
          new Error("shit");
        }
      }
    } else {
      try {
        const response = await getTemplete(
          localStorage.getItem("organization") || "",
          Number(data?.userTempleteId),
          true
        );
        setDetailData(response);
        setLikeCount(response[0]?.likeCount);
        setDetailModal(true);
        setClick(true);
        document.body.style.overflowY = "hidden";
        if (type === "like") {
          try {
            const res = await patchNotificationLike(Id);
            console.log(res);
          } catch {
            new Error("shit");
          }
        } else if (type === "comment") {
          try {
            const res = await patchNotificationComment(Id);
            console.log(res);
          } catch {
            new Error("shit");
          }
        }
      } catch {
        new Error("shit");
      }
    }
  };
  return (
    <ItemContainer
      onClick={() => spaceToDetail(data?.type, data?.commentId || data?.LikeId || 0)}
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
          <div className="data">
            {data?.nickname.length < 6 ? data?.nickname : `${data?.nickname.slice(0, 5)}...`}
          </div>
          님이&nbsp;
          <div className="data">{format(data?.templateName, "M월 dd일 회고")}</div>에{" "}
          {data?.type === "comment" ? "댓글을 남겼어요." : "응원을 보냈어요."}
        </div>
        <div className="date">{format(data?.createdAt, "yyyy.MM.dd (EEE)", { locale: ko })}</div>
      </div>
    </ItemContainer>
  );
};
