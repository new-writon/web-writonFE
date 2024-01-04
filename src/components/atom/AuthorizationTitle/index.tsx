import { useNavigate } from "react-router-dom";

import writonLogo from "@/assets/logo/writon_long.svg";
import { AuthTitleProps } from "@/types";

import { AuthTitle } from "./style";

export const AuthorizationTitle = ({ children }: AuthTitleProps) => {
  const navigate = useNavigate();
  return (
    <AuthTitle>
      <img
        src={writonLogo}
        alt="writon"
        onClick={() => navigate("/")}
      />
      {children}
    </AuthTitle>
  );
};
