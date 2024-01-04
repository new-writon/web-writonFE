import styled from "styled-components";

export const AuthTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  margin-bottom: 3rem;
  gap: 14px;
  img {
    width: 130px;
    cursor: pointer;
  }
  p {
    color: var(--Gray10_900, #212121);
    font-size: 2rem;
    font-weight: 600;
    line-height: 2rem;
    padding-top: 10px;
  }
`;
