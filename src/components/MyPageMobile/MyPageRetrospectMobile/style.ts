import styled from "styled-components";

export const Container = styled.div``;

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
    border: 1px solid var(--Gray-40, #d9d9d9);
    background: #fff;
    cursor: pointer;
  }
  .listmain:hover {
    background: var(--Gray-10, #fafafa);
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
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(33, 33, 33, 0.24);
    z-index: 9;
  }
  .lists li {
    width: 100%;
    color: var(--Gray-80, #616161);
    font-size: 0.875rem;
    line-height: 120%; /* 16.8px */
    padding: 11px 0px 9px 16px;
    background: #fff;
    cursor: pointer;
    font-weight: 500;
  }
  .lists li.active {
    background: var(--Gray-20, #f5f5f5);
  }
  .lists li:hover {
    background: var(--Gray-20, #f5f5f5);
  }

  .NewandOld {
    color: var(--Gray-60, #959595);
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
    color: var(--Gray-100, #212121);
    font-weight: 600;
  }
  .NewandOld .new::after {
    display: block;
    content: "";
    width: 1px;
    height: 15px;
    background: var(--Gray-30, #eee);
  }
`;

export const RetroSpectList = styled.div`
  padding-bottom: 60px;
`;
