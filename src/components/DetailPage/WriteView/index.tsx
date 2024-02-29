import { format } from "date-fns";

import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { communityContentProps } from "@/types";

import { Container } from "./style";

export const WriteView = ({ detailData }: { detailData: communityContentProps[] }) => {
  const arr = detailData?.filter((item) => item.category === "스페셜 질문");
  return (
    <Container>
      <div className="date">{format(detailData[0]?.created_at, "M월 d일 회고")}</div>
      {arr.length > 0 && (
        <div className="specialQuestion">
          <TitleSideBox type="special">스페셜 질문</TitleSideBox>
          <div className="QuestionBox">
            {arr.map((item, idx) => (
              <div>
                <div className="title">
                  {idx + 1}.{item?.question}
                </div>
                <div className="content">{item?.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="basicQuestion">
        {detailData.filter((item) => item.category !== "스페셜 질문").length > 0 && (
          <TitleSideBox type="special">베이직 질문</TitleSideBox>
        )}
        <div className="QuestionBox">
          {detailData
            .filter((item) => item.category !== "스페셜 질문")
            .map((item, idx) => (
              <div>
                <div className="title">
                  {idx + 1}.{item?.question}
                </div>
                <div className="content">{item?.content}</div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};
