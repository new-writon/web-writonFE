import React, { RefObject, forwardRef } from "react";

import { challengeListProps } from "@/types";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import { Container } from "./style";
interface ChangeOrganizationProps {
  ref: RefObject<HTMLDivElement>;
  organizationList: challengeListProps[];
}

export const ChangeOrganization = forwardRef<HTMLDivElement, ChangeOrganizationProps>(
  ({ organizationList }, ref) => {
    const changeOrganization = (organizaiton: string, challengeId: number) => {
      localStorage.setItem("organization", organizaiton);
      localStorage.setItem("challengeId", challengeId.toString());
      window.location.reload();
    };

    return (
      <Container ref={ref}>
        <div className="change-title">나의 라이톤</div>
        <div className="organization-list">
          {organizationList?.map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                onClick={() => changeOrganization(item.organization, item.challengeId)}
                className={`organization-item ${
                  localStorage.getItem("organization") === item.organization && "active"
                }`}
              >
                <img
                  src={item.logo}
                  onError={(e) => {
                    e.currentTarget.src = writon_icon; // 이미지 로딩에 실패하면 기본 이미지로 교체
                  }}
                  alt="W"
                />
                <span>{item.organization} 챌린지</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Container>
    );
  }
);
