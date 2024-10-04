import React, { useEffect, useState } from "react";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageRetrospectItemMobile } from "@/components/atom/MyPageRetrospectItem";
import { challengeListProps, communityContentProps } from "@/types";

import { Container, RetroSpectList, Top } from "./style";
import { useGetOrganizationsAndChallenges } from "@/hooks/reactQueryHooks/useCommonHooks";
import { useGetRetrospectCurrent } from "@/hooks/reactQueryHooks/useMainHooks";

export const MyPageRetrospectMobile = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [activeChallengeId, setActiveChallengeId] = useState<string>(
    localStorage.getItem("challengeId") || ""
  );
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [RetrospectData, setRetrospectData] = useState<communityContentProps[][]>([]);

  const { data: organizationChallenges } = useGetOrganizationsAndChallenges();
  const { data: retrospectCurrent = [] } = useGetRetrospectCurrent({
    organization: localStorage.getItem("organization") || "",
    challengeId: activeChallengeId,
  });

  const ChangeChallenge = async (item: challengeListProps) => {
    // 같은 챌린지를 두 번 클릭하는 경우에 상태를 업데이트하지 않도록 처리
    if (item.challengeId.toString() === activeChallengeId) return;

    setActiveChallengeId(item.challengeId.toString());
    setSelectChallenge(`${item.organization} ${item.challenge} 챌린지`);
    setListOn(false);
  };

  const ChangeViewState = (state: string) => {
    setViewState(state);
    if (state === "new") {
      setRetrospectData(RetrospectData.reverse());
    } else if (state === "old") {
      setRetrospectData(RetrospectData.reverse());
    }
  };

  useEffect(() => {
    // challengeId가 변경될 때만 상태를 업데이트
    if (retrospectCurrent) {
      if (viewState === "new") {
        setRetrospectData(retrospectCurrent); // 최신순일 때 데이터 그대로
      } else if (viewState === "old") {
        setRetrospectData(retrospectCurrent.reverse()); // 오래된순일 때 역순으로 설정
      }
    }
  }, [retrospectCurrent]); // activeChallengeId를 의존성으로 추가

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
      <RetroSpectList>
        {RetrospectData.length !== 0 ? (
          RetrospectData.map((item, idx) => (
            <React.Fragment key={idx}>
              <MyPageRetrospectItemMobile data={item} />
            </React.Fragment>
          ))
        ) : (
          <NoRetrospect type="my" />
        )}
      </RetroSpectList>
    </Container>
  );
};
