import React, { RefObject, forwardRef } from "react";

import chunsik_icon from "@/assets/logo/chunsik-icon.png";
import letsintern from "@/assets/logo/letsintern.png";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import { challengeListProps } from "@/types";

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
                onClick={() => changeOrganization(item.organization, item.challenge_id)}
                className={`organization-item ${
                  localStorage.getItem("organization") === item.organization && "active"
                }`}
              >
                <img
                  src={
                    item.organization === "렛츠인턴"
                      ? letsintern
                      : item.organization === "카카오"
                        ? chunsik_icon
                        : writon_icon
                  }
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
