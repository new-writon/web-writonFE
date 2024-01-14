import styled from "styled-components";

export const Container = styled.div<{ $font: number }>`
  color: var(--Gray-100, #212121);
  font-size: ${(props) => `${props.$font}rem`};
  font-weight: 700;
  margin: auto 0;
  line-height: 22px;
  display: flex;
  /* @media (max-width: 530px) {
    font-size: 1.125rem;
  } */
  .number {
    color: var(--purple-50);
    margin-left: 5px;
  }
`;
