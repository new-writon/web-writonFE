import kakao from "@/assets/logo/kakao.svg";
import { ButtonProps } from "@/types";

import { BlueBtn, KakaoBtn } from "./style";

export const KakaoButton = ({ children, onClick }: ButtonProps) => {
  return (
    <KakaoBtn onClick={onClick}>
      <p>
        <img
          src={kakao}
          alt="Kakao"
        />
      </p>
      {children}
    </KakaoBtn>
  );
};

export const BlueButton = ({ children, onClick }: ButtonProps) => {
  return <BlueBtn onClick={onClick}>{children}</BlueBtn>;
};
