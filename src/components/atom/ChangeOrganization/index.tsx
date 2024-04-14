import React, { useEffect, useState } from "react";

import { getChallengingList } from "@/apis/login";
import letsintern from "@/assets/logo/letsintern.png";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import { challengeListProps } from "@/types";

import { Container } from "./style";
export const ChangeOrganization = () => {
  const [organizationList, setOriganizationList] = useState<challengeListProps[]>();

  const changeOrganization = (organizaiton: string, challengeId: number) => {
    localStorage.setItem("organization", organizaiton);
    localStorage.setItem("challengeId", challengeId.toString());
    window.location.reload();
  };

  const organizationRendering = async () => {
    try {
      const data = await getChallengingList();
      const changeData = data.reduce(
        (acc: challengeListProps[], cur: challengeListProps) =>
          acc.some((item) => item.organization === cur.organization) ? acc : [...acc, cur],
        []
      );
      setOriganizationList(changeData);
    } catch {
      throw new Error("shit");
    }
  };
  useEffect(() => {
    organizationRendering();
  }, []);

  return (
    <Container>
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
                src={item.organization === "렛츠인턴" ? letsintern : writon_icon}
                alt="W"
              />
              <span>{item.organization} 챌린지</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
