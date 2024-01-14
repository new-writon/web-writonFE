import { TitleSideBoxProps } from "@/types";

import { Container } from "./style";

export const TitleSideBox = ({ children, type }: TitleSideBoxProps) => {
  return <Container $type={type}>{children}</Container>;
};
