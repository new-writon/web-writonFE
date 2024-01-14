import { RetrospectItemProps } from "@/types";

import { TitleSideBox } from "../TitleSideBox";

import { Container, PreviewBody, Title } from "./style";

export const RetrospectItem = ({ data }: { data: RetrospectItemProps }) => {
  return (
    <Container>
      <Title>
        <div className="mainTitle">{data?.date}</div>
        {data?.special && <TitleSideBox type="special">스페셜 질문</TitleSideBox>}
      </Title>
      <PreviewBody>
        {data?.preview.map((item, idx) => {
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
