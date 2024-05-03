import question from "@/assets/mainPage/question.svg";

import { Container } from "./style";
interface LabelCountingLabelCardPrps {
  title: string;
  currentContent: string;
  defaultContent: string;
  tooltipOn?: boolean;
  onClick: (tooltipOn: boolean) => void;
}

export const CountingLabelCard = ({
  title,
  currentContent,
  defaultContent,
  onClick,
  tooltipOn,
}: LabelCountingLabelCardPrps) => {
  return (
    <Container className="cardWrapper">
      <div className="labelTitle">
        {title}
        {title === "환급 가능 보증금" && (
          <img
            className="question"
            src={question}
            alt="?"
            onClick={() => onClick(!tooltipOn)}
          />
        )}
      </div>
      <div className="line"></div>
      <div className="labelContent">
        {currentContent}
        <span>/ {defaultContent}</span>
      </div>
    </Container>
  );
};
