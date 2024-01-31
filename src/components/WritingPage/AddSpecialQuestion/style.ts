import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: yellow;
  height: inherit;
  height: 791px;
  border-radius: 16px;
  background: var(--Base-White, #fff);
  padding: 26px 0;
  .top {
    padding: 0 20px;
  }
  .title {
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    gap: 6px;
    img {
      padding-bottom: 3px;
    }
  }
  .keywordBox {
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding: 0 20px;
    @media (max-width: 1090px) {
      flex-wrap: wrap;
    }
    @media (max-width: 846px) {
      display: block;
      .keywordList div {
        padding: 5px;
      }
    }
  }
  .keywordBox .keywordTitle {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%;
    margin-right: 10px;
    width: 50px;
    @media (max-width: 1090px) {
      padding-bottom: 10px;
    }
  }
  .keywordBox .keywordList {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .addQuestionBox {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 20px;
    overflow-y: scroll;
    height: calc(100% - 180px);
    scrollbar-width: thin;
    scrollbar-color: #d9d9d9 #fff; /* 검은색 Thumb 와 흰색 Track */
  }
  .addQuestionBoxTitle {
    padding: 0 20px;
    display: flex;
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    align-items: center;
    gap: 6px;
    margin: 22px 0 4px;
  }
`;
