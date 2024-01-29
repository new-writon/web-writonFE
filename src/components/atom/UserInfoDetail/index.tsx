import { format } from "date-fns";

import profile from "@/assets/communityPage/profile.png";

import { Container } from "./style";

interface userInfoDetailProps {
  profile: string;
  nickname: string;
  job: string;
  company: string | null;
  created_at: string;
}

export const UserInfoDetail = ({ data }: { data: userInfoDetailProps }) => {
  return (
    <Container>
      <div className="profileImageCover">
        <img
          src={data?.profile || profile} //{data?.profile}
          alt="profile"
        />
      </div>
      <div className="user">
        <div className="top">
          <div className="name">{data?.nickname}</div>
        </div>
        <div className="bottom">
          <div className="job">{data?.job}</div>
          <div className={`company ${data?.company === null && "none"}`}>{data?.company}</div>
          <div className="date">{format(data?.created_at, "M월 d일")}</div>
          {/* 해당 날짜 데이터 받아서 formating 시키기 */}
        </div>
      </div>
    </Container>
  );
};
