/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { getChallengingList } from "@/apis/login";
import { getNotificationData, patchNotificationCount } from "@/apis/notification";
import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageNotificationItemMobile } from "@/components/atom/MyPageNotificationItem";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { notficationNumberState } from "@/recoil/atoms";
import { challengeListProps, notificationDataType } from "@/types";

import { CommentList, Container, Top } from "./style";

export const MyPageNotificationMobile = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [NotificationData, setNotificationData] = useState<notificationDataType[]>([]);
  const executeAsyncTask = useAsyncWithLoading();
  const setNotificationNumber = useSetRecoilState(notficationNumberState);

  const ChangeChallenge = async (item: challengeListProps) => {
    try {
      const data = await getNotificationData(item.organization, item.challenge_id.toString());
      if (viewState === "new") {
        setNotificationData(data.reverse());
      } else if (viewState === "old") {
        setNotificationData(data);
      }
      setSelectChallenge(`${item.organization} ${item.challenge} 챌린지`);
      setListOn(false);
    } catch {
      new Error("shit");
    }
  };

  const ChangeViewState = (state: string) => {
    setViewState(state);
    if (viewState === "new") {
      setNotificationData(NotificationData.reverse());
    } else if (viewState === "old") {
      setNotificationData(NotificationData.reverse());
    }
  };

  const NotificationRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const list = await getChallengingList();
        setChallengeList(
          list.filter((item) => item.organization === localStorage.getItem("organization"))
        );
        const activeList = list.filter(
          (item) => item.challenge_id.toString() === localStorage.getItem("challengeId")
        );
        setSelectChallenge(`${activeList[0].organization} ${activeList[0].challenge} 챌린지`);
        try {
          const data = await getNotificationData(
            activeList[0].organization,
            activeList[0].challenge_id.toString()
          );
          setNotificationData(data);
          try {
            await patchNotificationCount(
              localStorage.getItem("organization") as string,
              localStorage.getItem("challengeId") as string,
              data.length
            );
            setNotificationNumber(0);
          } catch {
            new Error("shit");
          }
        } catch {
          new Error("shit");
        }
      } catch {
        new Error("shit");
      }
    });
  };

  useEffect(() => {
    NotificationRendering();
  }, []);

  return (
    <Container>
      <Top>
        <div className="toggleList">
          <div
            className="listmain"
            onClick={() => setListOn(!listOn)}
          >
            <p>{selectChallenge}</p>
            <img
              src={listOn ? topArrow : downArrow}
              alt="v"
            />
          </div>
          {listOn && (
            <ul className="lists">
              {challengeList?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <li
                    className={
                      `${item.organization} ${item.challenge} 챌린지` === selectChallenge
                        ? "active"
                        : ""
                    }
                    onClick={() => ChangeChallenge(item)}
                  >
                    {item.organization} {item.challenge} 챌린지
                  </li>
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
        <div className="NewandOld">
          <div
            className={`${viewState === "new" && "active"} new`}
            onClick={() => ChangeViewState("new")}
          >
            최신순
          </div>
          <div
            className={`${viewState === "old" && "active"} old`}
            onClick={() => ChangeViewState("old")}
          >
            오래된순
          </div>
        </div>
      </Top>
      <CommentList>
        {NotificationData.length !== 0 ? (
          NotificationData.map((item, idx) => (
            <React.Fragment key={idx}>
              <MyPageNotificationItemMobile data={item} />
            </React.Fragment>
          ))
        ) : (
          <NoRetrospect type="notification" />
        )}
      </CommentList>
    </Container>
  );
};
