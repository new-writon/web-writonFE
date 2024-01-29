import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 530px) {
    background-color: var(--Gray-20, #f5f5f5);
  }
`;

export const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 31px 0 21px;
  position: -webkit-sticky;
  position: sticky;
  top: 71px;
  z-index: 9999;
  border-bottom: 1px solid var(--Gray-30);
  background-color: var(--Gray-20, #f5f5f5);
  padding-left: 26px;
  @media (max-width: 530px) {
    top: 107px;
    padding-left: 0;
  }
  .title {
    display: flex;
    gap: 6px;
  }
  .flex {
    display: flex;
    font-size: 1.25rem;
  }
  .flex .number {
    margin: 0;
  }
  .changeDate {
    display: flex;
    align-items: center;
  }
  .changeDate .today {
    color: var(--Gray-80, #616161);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
    margin: 0 8px;
  }
  .changeDate .previous {
    cursor: pointer;
  }

  .changeDate .next {
    cursor: pointer;
    transform: rotate(180deg);
  }
`;

export const CommunityItemBox = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 18px;
  padding-bottom: 150px;
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;
