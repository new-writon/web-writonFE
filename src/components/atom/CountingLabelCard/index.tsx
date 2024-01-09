import question from "@/assets/mainPage/question.svg";

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
    <Container className="cardWrapper">
      <div className="labelTitle">
        {title}
        {title === "환급 가능 보증금" && (
          <img
            className="question"
            src={question}
            alt="?"
          />
        )}
      </div>
      <div className="labelContent">
        {currentContent}
        <p>/{defaultContent}</p>
      </div>
    </Container>
  );
};
