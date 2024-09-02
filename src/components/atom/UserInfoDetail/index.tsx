import { format } from "date-fns";

import profile from "@/assets/communityPage/profile.png";

import { Container } from "./style";

interface userInfoDetailProps {
  profile: string;
  nickname: string;
  position: string;
  company: string | null;
  createdAt: string;
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
          <div className="position">{data?.position}</div>
          <div className={`company ${data?.company === null && "none"}`}>{data?.company}</div>
          <div className="date">{format(data?.createdAt, "M월 d일")}</div>
          {/* 해당 날짜 데이터 받아서 formating 시키기 */}
        </div>
      </div>
    </Container>
  );
};
