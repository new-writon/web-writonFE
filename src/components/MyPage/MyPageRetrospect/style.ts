import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--White, #fff);
  width: 805px;
  border-radius: 16px;
  margin-bottom: 300px;
  padding: 50px 50px 80px 60px;
  max-height: 812px;
  position: relative;

  .title {
    color: #000;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 130%; /* 23.4px */
  }
`;

export const Top = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .toggleList {
    position: relative;
  }
  .listmain {
    display: inline-flex;
    padding: 7px 10px 7px 16px;
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
    color: var(--purple-50, #6a63f5);
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
    padding: 11px 0px 9px 16px;
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

export const RetroSpectList = styled.div`
  margin-top: 24px;
`;

export const RetrospectPagination = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  .page {
    padding: 7px 6px;
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
    cursor: pointer;
  }
  .notactive {
  }
  .page:hover {
    border-radius: 6px;
    background: var(--Gray-20, #f8f8fa);
  }
  .page.active {
    color: var(--purple-50, #6a63f5);
  }
`;
