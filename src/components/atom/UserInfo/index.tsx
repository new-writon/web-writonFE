import profile from "@/assets/communityPage/profile.png";

import { Container } from "./style";

interface userProps {
  name: string;
  job: string;
  company: string | null;
  profile: string;
}

export const UserInfo = ({ data }: { data: userProps }) => {
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
          <div className="job">{data?.job}</div>
          <div className="company">{data?.company}</div>
        </div>
        <div className="date">2월 3일</div> {/* 해당 날짜 데이터 받아서 formating 시키기 */}
      </div>
    </Container>
  );
};
