/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { getMyPageRetrospectItem } from "@/apis/MyPage";
import { getChallengingList } from "@/apis/login";
import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageRetrospectItemMobile } from "@/components/atom/MyPageRetrospectItem";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { challengeListProps, communityContentProps } from "@/types";

import { Container, RetroSpectList, Top } from "./style";

export const MyPageRetrospectMobile = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [RetrospectData, setRetrospectData] = useState<communityContentProps[][]>([]);
  const executeAsyncTask = useAsyncWithLoading();

  const ChangeChallenge = async (item: challengeListProps) => {
    try {
      const data = await getMyPageRetrospectItem(item.organization, item.challengeId.toString());
      if (viewState === "new") {
        setRetrospectData(data.templateData.reverse());
      } else if (viewState === "old") {
        setRetrospectData(data.templateData);
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
      setRetrospectData(RetrospectData.reverse());
    } else if (viewState === "old") {
      setRetrospectData(RetrospectData.reverse());
    }
  };

  const RetrospectRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const list = await getChallengingList();
        setChallengeList(
          list.filter((item) => item.organization === localStorage.getItem("organization"))
        );
        const activeList = list.filter(
          (item) => item.challengeId.toString() === localStorage.getItem("challengeId")
        );
        setSelectChallenge(`${activeList[0].organization} ${activeList[0].challenge} 챌린지`);
        try {
          const data = await getMyPageRetrospectItem(
            activeList[0].organization,
            activeList[0].challengeId.toString()
          );
          setRetrospectData(data.templateData.reverse());
        } catch {
          new Error("shit");
        }
      } catch {
        new Error("shit");
      }
    });
  };
  useEffect(() => {
    RetrospectRendering();
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
