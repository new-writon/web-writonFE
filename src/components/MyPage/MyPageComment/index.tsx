import React, { useEffect, useState } from "react";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageCommentItem } from "@/components/atom/MyPageCommentItem";
import { challengeListProps, myPageCommentType } from "@/types";

import { CommentList, Container, Top } from "./style";
import { Pagination } from "@/components/atom/Pagination";
import { useGetOrganizationsAndChallenges } from "@/hooks/reactQueryHooks/useCommonHooks";
import { useGetMyCommentItem } from "@/hooks/reactQueryHooks/useMainHooks";

export const MyPageComment = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [activeChallengeId, setActiveChallengeId] = useState<string>(
    localStorage.getItem("challengeId") || ""
  );
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [CommentData, setCommentData] = useState<myPageCommentType[]>([]);
  const [activePage, setActivePage] = useState<number>(1); // 나중에 쿼리스트링으로 바꿔여함.

  const { data: organizationChallenges } = useGetOrganizationsAndChallenges();
  const { data: commentCurrent = [] } = useGetMyCommentItem({
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
      setCommentData(CommentData.reverse());
    } else if (viewState === "old") {
      setCommentData(CommentData.reverse());
    }
  };

  // 의존성 배열에서 불필요한 렌더링 방지
  useEffect(() => {
    // challengeId가 변경될 때만 상태를 업데이트
    if (commentCurrent) {
      if (viewState === "new") {
        setCommentData(commentCurrent); // 최신순일 때 데이터 그대로
      } else if (viewState === "old") {
        setCommentData(commentCurrent.reverse()); // 오래된순일 때 역순으로 설정
      }
    }
  }, [commentCurrent]);

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
      <div className="title">작성한 댓글</div>
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
        {CommentData.length !== 0 ? (
          CommentData.slice(activePage * 10 - 10, activePage * 10).map((item, idx) => (
            <React.Fragment key={idx}>
              <MyPageCommentItem data={item} />
            </React.Fragment>
          ))
        ) : (
          <NoRetrospect type="comment" />
        )}
      </CommentList>
      <Pagination
        page={activePage}
        setPage={setActivePage}
        pageLength={CommentData.length}
      />
    </Container>
  );
};
