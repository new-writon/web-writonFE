import styled from "styled-components";
import fireOn from "@/assets/DetailPage/fireOff.svg";
import dots from "@/assets/DetailPage/dots.svg";

interface MobileLikePeopleButtonProps {
  likeCount: string;
  onPress: () => void; // 이벤트 핸들러 정의
}

const MobileLikePeopleButton = ({ likeCount, onPress }: MobileLikePeopleButtonProps) => {
  return (
    <Container onClick={onPress}>
      <img
        src={fireOn}
        alt="fire"
      />
      <span>{likeCount}</span>
      <img
        src={dots}
        alt="..."
      />
    </Container>
  );
};

export default MobileLikePeopleButton;

const Container = styled.div`
  cursor: pointer; /* 클릭 시 포인터 커서 표시 */
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px;

  /* Press 상태 스타일 */
  &:active {
    background-color: var(--Gray-40, #d2d5db); /* Press 시 배경색 */
    border-radius: 8px; /* Press 시 둥근 모서리 */
  }
  span {
    color: var(--Gray-80, #464c52);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
`;
