import { MainSemiTitleProps } from "@/types";

import { Container } from "./style";

export const MainSemiTitle = ({ children, font }: MainSemiTitleProps) => {
  return <Container $font={font}>{children}</Container>;
};
