import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { RetrospectCurrentType } from "@/types";

import { TitleSideBox } from "../TitleSideBox";

import { Container, PreviewBody, Title } from "./style";

export const RetrospectItem = ({ data }: { data: RetrospectCurrentType[] }) => {
  const arr = data?.filter((item) => item.category === "스페셜 질문");
  return (
    <Container>
      <Title>
        <div className="mainTitle">
          {format(data[0].finished_at, "M월 d일 EEE요일", { locale: ko })}
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
              <div className="question">{item.question}</div>
              <div className="content">{item.content}</div>
            </div>
          );
        })}
      </PreviewBody>
    </Container>
  );
};
