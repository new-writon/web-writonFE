import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 10px;
  .noRetrospectItemBox {
    margin: 0 auto;
  }

  .noRetrospectItemBox .title {
    color: var(--Gray-80, #464c52);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
    text-align: center;
    margin: 20px 0 8px;
  }
  .noRetrospectItemBox .semiTitle {
    color: var(--Gray-60, #94989f);
    font-size: 1rem;
    line-height: 130%; /* 24px */
    text-align: center;
    margin-bottom: 24px;
  }

  .noRetrospectItemBox .writingBtn {
    width: fit-content;
    display: flex;
    padding: 7px 15px 7px 16px;
    border-radius: 10px;
    background-color: var(--purple-50, #6a63f5);
    justify-content: center;
    align-items: center;
    gap: 7.5px;
    cursor: pointer;
    margin: 0 auto;
  }

  p {
    color: var(--White);
    font-weight: 500;
    text-align: center;
    margin: auto 0;
    padding-top: 3px;
  }

  .writingBtn img {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 530px) {
    .noRetrospectItemBox {
      margin: 30px auto 0;
    }

    .noRetrospectItemBox .writingBtn {
      display: none;
    }
  }
`;
