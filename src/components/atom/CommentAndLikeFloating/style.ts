import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: -80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    filter: drop-shadow(0px 4px 30px rgba(33, 33, 33, 0.05));
  }
  .likeBox {
    cursor: pointer;
  }
  .round img {
    height: fit-content;
  }
  .round .num {
    padding-top: 4px;
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
  .ment {
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    text-align: center;
  }

  .round.hover,
  .round.click {
    background-color: var(--purple-50, #6a63f5);
  }

  .hover .num,
  .click .num {
    color: var(--White);
  }
`;
