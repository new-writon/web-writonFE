import { Container } from "./style";

interface LabelCountingLabelCardPrps {
  title: string;
  currentContent: string;
  defaultContent: string;
}

export const CountingLabelCard = ({
  title,
  currentContent,
  defaultContent,
}: LabelCountingLabelCardPrps) => {
  return (
    <Container>
      <div className="labelTitle">{title}</div>
      <div className="labelContent">
        {currentContent}
        <p>/{defaultContent}</p>
      </div>
    </Container>
  );
};
