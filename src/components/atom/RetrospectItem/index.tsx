import { format } from "date-fns";
import { ko } from "date-fns/locale";
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
  const spaceToDetail = () => {
    setDetailData(data);
    setLikeCount(data[0]?.likeCount);
    setDetailModal(true);
  };

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
