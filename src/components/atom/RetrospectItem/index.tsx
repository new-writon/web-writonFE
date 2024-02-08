import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { DetailDataState, DetailModalState, LikeState } from "@/recoil/atoms";
import { communityContentProps } from "@/types";

import { TitleSideBox } from "../TitleSideBox";

import { Container, PreviewBody, Title } from "./style";

export const RetrospectItem = ({ data }: { data: communityContentProps[] }) => {
  const arr = data?.filter((item) => item.category === "스페셜 질문");
  const setDetailData = useSetRecoilState(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const setLikeCount = useSetRecoilState(LikeState);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();

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
      <Title>
        <div className="mainTitle">
          {format(data[0]?.created_at, "M월 d일 EEE요일", { locale: ko })}
        </div>
        {arr.length > 0 && <TitleSideBox type="special">스페셜 질문</TitleSideBox>}
      </Title>
      <PreviewBody>
        {data?.map((item, idx) => {
          return (
            <div
              className="previewItem"
              key={idx}
            >
              <div className="question">{item?.question}</div>
              <div className="content">{item?.content}</div>
            </div>
          );
        })}
      </PreviewBody>
    </Container>
  );
};
