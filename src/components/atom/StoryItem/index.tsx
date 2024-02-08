import { useRecoilState, useRecoilValue } from "recoil";

import profile from "@/assets/communityPage/profile.png";
import { PreTodayWriteState, modalBackgroundState } from "@/recoil/atoms";
import { communityStoryProps } from "@/types";

import { Container } from "./style";

export const StoryItem = ({
  data,
  someone,
  onClick,
}: {
  data: communityStoryProps | undefined;
  someone: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void | undefined;
}) => {
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const TodayWrite = useRecoilValue(PreTodayWriteState);
  const TodayWriteFunc = () => {
    setModal({ ...modal, todayWriteModal: true });
  };

  return (
    <Container
      $someone={someone}
      $message={data?.cheering_phrase}
    >
      {someone === "me" ? (
        data?.cheering_phrase === null ? (
          <div
            className="storyMessage"
            onClick={TodayWrite === "" ? TodayWriteFunc : () => {}}
          >
            {TodayWrite === "" ? "오늘의\n 한마디+" : TodayWrite}
          </div>
        ) : (
          <div
            className="storyMessage"
            dangerouslySetInnerHTML={{ __html: data?.cheering_phrase || "<div></div>" }}
          ></div>
        )
      ) : (
        <div
          className="storyMessage"
          dangerouslySetInnerHTML={{ __html: data?.cheering_phrase || "<div></div>" }}
        ></div>
      )}
      <div className="profileBox">
        <div
          className="profileImageCover"
          onClick={onClick}
        >
          <img
            src={data?.profile || profile} //{data?.profile}
            alt="profile"
          />
        </div>
        <div className="job">{data?.job}</div>
        <div className="company">{data?.company || "비공개"}</div>
      </div>
      {/* <div className="introducePopup">
        <div className="userInfo"></div>
        <div className="oneline">{data?.oneline}</div>
      </div> */}
    </Container>
  );
};
