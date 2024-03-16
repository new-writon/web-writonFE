import React, { useEffect, useState } from "react";

import { getMyPageCommentItem } from "@/apis/MyPage";
import { getChallengingList } from "@/apis/login";
import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { NoRetrospect } from "@/components/MainPage/NoRetrospect";
import { MyPageCommentItem } from "@/components/atom/MyPageCommentItem";
import { challengeListProps, myPageCommentType } from "@/types";

import { CommentList, CommentPagination, Container, Top } from "./style";

export const MyPageComment = () => {
  const [challengeList, setChallengeList] = useState<challengeListProps[]>();
  const [selectChallenge, setSelectChallenge] = useState<string>("");
  const [listOn, setListOn] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("new");
  const [CommentData, setCommentData] = useState<myPageCommentType[]>([]);
  const [activePage, setActivePage] = useState<number>(1); // 나중에 쿼리스트링으로 바꿔여함.

  const ChangeChallenge = async (item: challengeListProps) => {
    try {
      const data = await getMyPageCommentItem(item.organization, item.challenge_id.toString());
      if (viewState === "new") {
        setCommentData(data.reverse());
      } else if (viewState === "old") {
        setCommentData(data);
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
      setCommentData(CommentData.reverse());
    } else if (viewState === "old") {
      setCommentData(CommentData.reverse());
    }
  };

  const CommentRendering = async () => {
    try {
      const list = await getChallengingList();
      setChallengeList(list);
      setSelectChallenge(`${list[0].organization} ${list[0].challenge} 챌린지`);
      try {
        const data = await getMyPageCommentItem(
          list[0].organization,
          list[0].challenge_id.toString()
        );
        setCommentData(data);
      } catch {
        new Error("shit");
      }
    } catch {
      new Error("shit");
    }
  };

  useEffect(() => {
    CommentRendering();
  }, []);

  //pagination 로직
  const pages = [];
  let pageCount;
  if (CommentData.length % 10 === 0) {
    pageCount = Math.floor(CommentData.length / 10);
  } else {
    if (Math.floor(CommentData.length / 10) === 0) {
      pageCount = 1;
    } else {
      pageCount = Math.floor(CommentData.length / 10) + 1;
    }
  }
  for (let i = 0; i < pageCount; i++) {
    pages.push(
      <div
        className={`${activePage === i + 1 ? "active" : "notactive"} page`}
        onClick={() => {
          setActivePage(i + 1);
          window.scrollTo({ top: 0 });
        }}
        key={i}
      >
        {i + 1}
      </div>
    );
  }

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
      <CommentPagination>{pages}</CommentPagination>
    </Container>
  );
};
