import close from "@/assets/mainPage/close.svg";

import { Container } from "./style";

export const TooltipMessage = ({
  onClick,
  direction,
  page,
}: {
  onClick: () => void;
  direction: string;
  page: string;
}) => {
  return (
    <Container
      $direction={direction}
      $page={page}
    >
      <div className="messageBox">
        <ol>
          <li>챌린지 인증 기간 내에, 오늘의 회고를 작성해주세요.</li>
          <li>달력의 연필 모양 버튼 또는 상단의 ‘회고 작성하기' 버튼을 눌러 작성할 수 있어요.</li>
          <li>챌린지 인증 기간이 지나도, 지난 날짜의 회고를 작성할 수 있어요.</li>
          <li>인증 기간 내 작성시 금색 뱃지를, 지난 회고 작성 시 은색 뱃지를 드려요.</li>
        </ol>
      </div>
      <img
        onClick={onClick}
        src={close}
        alt="X"
      />
    </Container>
  );
};
