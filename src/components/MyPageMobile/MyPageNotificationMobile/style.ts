import styled from "styled-components";

export const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 60px);
`;

export const Top = styled.div`
  padding: 27px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .toggleList {
    position: relative;
  }
  .listmain {
    display: inline-flex;
    padding: 7px 10px 7px 10px;
    gap: 10px;
    border-radius: 6px;
    border: 1px solid var(--Gray-40, #d2d5db);
    background: var(--White, #fff);
    cursor: pointer;
  }
  .listmain:hover {
    background: var(--Gray-10, #fcfcfc);
  }
  .listmain p {
    color: var(--Main-50, #6272ff);
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    margin-top: 2px;
  }

  .lists {
    width: 100%;
    position: absolute;
    top: 35px;
    left: 0;
    display: inline-flex;
    padding: 8px 0px;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    background: var(--White, #fff);
    box-shadow: 0px 4px 16px 0px rgba(33, 33, 33, 0.24);
    z-index: 9;
  }
  .lists li {
    width: 100%;
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    line-height: 120%; /* 16.8px */
    padding: 11px 16px 9px 16px;
    background: var(--White, #fff);
    cursor: pointer;
    font-weight: 500;
  }
  .lists li.active {
    background: var(--Gray-20, #f8f8fa);
  }
  .lists li:hover {
    background: var(--Gray-20, #f8f8fa);
  }

  .NewandOld {
    color: var(--Gray-60, #94989f);
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 120%; /* 16.8px */
    display: flex;
    gap: 8px;
    div {
      cursor: pointer;
    }
  }
  .NewandOld .new {
    display: flex;
    gap: 8px;
  }
  .NewandOld .active {
    color: var(--Gray-100, #1b1d1f);
    font-weight: 600;
  }
  .NewandOld .new::after {
    display: block;
    content: "";
    width: 1px;
    height: 15px;
    background: var(--Gray-30, #edeef1);
  }
`;

export const CommentList = styled.div`
  padding-bottom: 60px;
`;
