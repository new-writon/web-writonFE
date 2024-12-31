import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: -80px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .likePeopleListContainer {
    position: absolute;
    width: 200%;
    height: 100%;
    z-index: 1;
    transform: translateX(-50%);
    left: 50%;
  }

  .Box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .round {
    width: 64px;
    height: 64px;
    border-radius: 100%;
    background-color: var(--White);
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 20px 10px;
    will-change: filter;
    filter: drop-shadow(0px 4px 30px rgba(33, 33, 33, 0.05));
  }

  .likeBox {
    cursor: pointer;
    z-index: 2;
  }
  .round img {
    height: fit-content;
  }
  .round .num {
    padding-top: 4px;
    color: var(--Gray-100, #1b1d1f);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
  .ment {
    color: var(--White, #fff);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    text-align: center;
  }

  .round.hover,
  .round.click {
    background-color: var(--Main-50, #6272ff);
  }

  .hover .num,
  .click .num {
    color: var(--White);
  }

  @media (max-width: 530px) {
    /* display: none; */
    position: fixed;
    right: 16px;
    /* top: 426px; */
    bottom: 75px;
    top: auto;
    gap: 12px;
    .round {
      width: 50px;
      height: 50px;
      gap: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      padding-top: 4px;
      box-shadow: 0px 4px 20px 0px rgba(33, 33, 33, 0.15);
    }
    .ment {
      display: none;
    }
    .round .num {
      padding-top: 0;
    }
  }
`;
