import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageNotificationItem } from "@/components/atom/MyPageNotificationItem";
import { notficationNumberState } from "@/recoil/atoms";
import { challengeListProps, notificationDataType } from "@/types";

import { CommentList, Container, Top } from "./style";
import { Pagination } from "@/components/atom/Pagination";
import { useGetOrganizationsAndChallenges } from "@/hooks/reactQueryHooks/useCommonHooks";
import { useGetNotificationItem } from "@/hooks/reactQueryHooks/useMainHooks";
import { patchNotificationCount } from "@/apis/notification";

export const MyPageNotification = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [activeChallengeId, setActiveChallengeId] = useState<string>(
    localStorage.getItem("challengeId") || ""
  );
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [NotificationData, setNotificationData] = useState<notificationDataType[]>([]);
  const [activePage, setActivePage] = useState<number>(1); // 나중에 쿼리스트링으로 바꿔여함.
  const [isInitialNotificationLoad, setIsInitialNotificationLoad] = useState(true);

  const setNotificationNumber = useSetRecoilState(notficationNumberState);

  const { data: organizationChallenges } = useGetOrganizationsAndChallenges();
  const { data: notificationCurrent = [] } = useGetNotificationItem({
    organization: localStorage.getItem("organization") || "",
    challengeId: activeChallengeId,
  });

  // 챌린지를 변경하는 함수
  const ChangeChallenge = async (item: challengeListProps) => {
    // 같은 챌린지를 두 번 클릭하는 경우에 상태를 업데이트하지 않도록 처리
    if (item.challengeId.toString() === activeChallengeId) return;

    setActiveChallengeId(item.challengeId.toString());
    setSelectChallenge(`${item.organization} ${item.challenge} 챌린지`);
    setListOn(false);
  };

  const ChangeViewState = (state: string) => {
    setViewState(state);
    if (viewState === "new") {
      setNotificationData(NotificationData.reverse());
    } else if (viewState === "old") {
      setNotificationData(NotificationData.reverse());
    }
  };

  const updateNotificationCount = async () => {
    try {
      await patchNotificationCount(
        localStorage.getItem("organization") as string,
        localStorage.getItem("challengeId") as string,
        notificationCurrent.length
      );
      setNotificationNumber(0);
      setIsInitialNotificationLoad(false);
    } catch {
      new Error("shit");
    }
  };

  // 의존성 배열에서 불필요한 렌더링 방지
  useEffect(() => {
    // challengeId가 변경될 때만 상태를 업데이트
    if (notificationCurrent) {
      if (viewState === "new") {
        setNotificationData(notificationCurrent); // 최신순일 때 데이터 그대로
      } else if (viewState === "old") {
        setNotificationData(notificationCurrent.reverse()); // 오래된순일 때 역순으로 설정
      }
    }
    if (isInitialNotificationLoad) {
      // 처음 호출시에만 동작하게 하기 위한 조건문
      updateNotificationCount();
    }
  }, [notificationCurrent]);

  useEffect(() => {
    if (organizationChallenges) {
      const selectedChallenge = organizationChallenges?.filter(
        (item) => item.organization === localStorage.getItem("organization")
      );
      setChallengeList(selectedChallenge);

      const activeChallenge = selectedChallenge.find(
        (item) => item.challengeId.toString() === localStorage.getItem("challengeId")
      );
      setActiveChallengeId(activeChallenge?.challengeId.toString() || "");
      setSelectChallenge(`${activeChallenge?.organization} ${activeChallenge?.challenge} 챌린지`);
    }
  }, [organizationChallenges]);

  return (
    <Container>
      <div className="title">알림</div>
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
          NotificationData.slice(activePage * 10 - 10, activePage * 10).map((item, idx) => (
            <React.Fragment key={idx}>{<MyPageNotificationItem data={item} />}</React.Fragment>
          ))
        ) : (
          <NoRetrospect type="notification" />
        )}
      </CommentList>
      <Pagination
        page={activePage}
        setPage={setActivePage}
        pageLength={NotificationData.length}
      />
    </Container>
  );
};
