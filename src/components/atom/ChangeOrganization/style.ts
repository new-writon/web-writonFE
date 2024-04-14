import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translate(0, 0%); /* NEW */
    transform:scale(0) ;
 }
  to {
    transform: translate(0, 100%); /* NEW */
    transform:scale(1);
  }
`;

export const Container = styled.div`
  border-radius: 16px;
  background: var(--White, #fff);
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  padding: 14px 24px 25px 14px;
  position: absolute;
  z-index: 99999;
  top: 75px;
  min-width: 248px;
  animation: ${slideIn} 0.2s ease-in-out forwards;
  @media (max-width: 530px) {
    top: 55px;
  }

  .change-title {
    color: var(--Gray-60, #94989f);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 14.4px */
    margin-bottom: 12px;
  }
  .organization-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .organization-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .organization-item.active {
    background-color: var(--Gray-20);
    border-radius: 15px;
    pointer-events: none;
  }
  .organization-item img {
    width: 42px;
    height: 42px;
  }
  .organization-item span {
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }
`;
