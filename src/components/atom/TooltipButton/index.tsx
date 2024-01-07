import question from "@/assets/mainPage/question.svg";
import { TooltipButtonProps } from "@/types";

import { Container } from "./style";

export const TooltipButton = ({ children, onClick, tooltipOn }: TooltipButtonProps) => {
  return (
    <Container
      onClick={onClick}
      $tooltipOn={tooltipOn}
    >
      <img
        src={question}
        alt="?"
        width={14}
        height={14}
      />
      <p>{children}</p>
    </Container>
  );
};

// 호버 이벤트 넣기
