import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 531px) {
    display: none;
  }
  margin: 12px 0;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .questionButton {
    display: flex;
    gap: 4px;
    justify-content: flex-end;
  }
  .addQuestionWrapper {
  }
  .keywordBox {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 16px;
  }
  .keywordBox .keywordTitle {
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%;
    margin-right: 10px;
  }
  .keywordBox .keywordList {
    display: flex;
    gap: 6px;
  }
  .Box {
    width: 100vh;
    overflow-x: scroll;
  }
  .addQuestionBox {
    display: flex;
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    gap: 14px;
    padding-bottom: 27px;
    margin-bottom: 7px;
  }
  .addQuestionBox::-webkit-scrollbar {
    width: 2px; /* 스크롤바의 너비 */
    height: 2px;
  }

  .addQuestionBox::-webkit-scrollbar-thumb {
    width: 2px;
    height: 2px; /* 스크롤바의 길이 */
    background: #8e89ff; /* 스크롤바의 색상 */
  }

  .addQuestionBox::-webkit-scrollbar-track {
    background: #d9d9d9; /*스크롤바 뒷 배경 색상*/
  }
`;
