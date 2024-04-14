import React from "react";

// import letsintern from "@/assets/logo/letsintern.png";
import writon_icon from "@/assets/logo/logo-writon-roundbox.svg";
import writon from "@/assets/logo/writon_long.svg";

import { Container } from "./style";

const ICON = [writon_icon, writon];

export const OnboardingHeader = () => {
  return (
    <Container>
      <div className="icons">
        {ICON.map((logo, idx) => (
          <React.Fragment key={idx}>
            <img
              src={logo}
              alt={`${logo}`}
            />
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
