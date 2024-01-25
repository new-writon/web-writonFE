import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import pencil_white from "@/assets/header/pencil_white.svg";
import NoRetrospectItem from "@/assets/mainPage/NoRetrospect.svg";

import { Container } from "./style";

const textMyData = {
  title: "아직 작성한 회고가 없어요.",
  semititleFirst: "작성한 회고는 여기서 모아볼 수 있어요. ",
  semititleSecond: "첫 회고를 작성하러 가볼까요?",
};

const textCommunityData = {
  title: "아직 작성된 회고가 없어요.",
  semititleFirst: "아직 회고를 작성한 사람이 없어요.",
  semititleSecond: "1등으로 작성하러 가볼까요?",
};

export const NoRetrospect = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const stringData = type === "my" ? textMyData : textCommunityData;
  return (
    <Container>
      <div className="noRetrospectItemBox">
        <img
          src={NoRetrospectItem}
          alt="NO"
        />
        <div className="title">{stringData.title}</div>
        {!isToday(today) && (
          <>
            <div className="semiTitle">
              {stringData.semititleFirst}
              <br />
              {stringData.semititleSecond}
            </div>
            <div
              className="writingBtn"
              onClick={() => navigate(`/writing/${today}`)}
            >
              <p>회고 작성하기</p>
              <img
                src={pencil_white}
                alt="pen"
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
