import { useEffect, useState } from "react";

import styled from "styled-components";

import { getNotificationData } from "@/apis/notification";
import close from "@/assets/mainPage/close.svg";
import Loading from "@/components/Common/Loading";
import { TooltipNotification } from "@/components/atom/TooltipNotification";
import { notificationDataType } from "@/types";

export const NotificationPage = () => {
  const [notificationData, setNotificationData] = useState<notificationDataType[]>([]);

  const notificationRendering = async () => {
    try {
      const data = await getNotificationData(
        localStorage.getItem("organization") as string,
        localStorage.getItem("challengeId") as string
      );

      setNotificationData(data);
    } catch {
      throw new Error("shit");
    }
  };
  useEffect(() => {
    notificationRendering();
  }, []);
  return (
    <>
      {notificationData.length === 0 ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            <div>알림</div>
            <img
              src={close}
              alt="X"
              onClick={() => history.back()}
            />
          </Header>
          <TooltipNotification
            data={notificationData}
            type="mobile"
          />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--Gray-100, #212121);

  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  div {
    margin-top: 3px;
  }
  img {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
`;
