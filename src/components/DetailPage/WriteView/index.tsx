import { useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import optionImg from "@/assets/DetailPage/option.svg";
import pencilImg from "@/assets/DetailPage/pencil.svg";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import {
  DetailModalState,
  addSpecialQuestionState,
  postEditWritingDataState,
} from "@/recoil/atoms";
import { communityContentProps } from "@/types";

import { Container } from "./style";

export const WriteView = ({
  detailData,
  nickName,
}: {
  detailData: communityContentProps[];
  nickName: string;
}) => {
  const navigate = useNavigate();
  const setDetailModal = useSetRecoilState(DetailModalState);
  const setPostEditWritingData = useSetRecoilState(postEditWritingDataState);
  const setIsClickArray = useSetRecoilState(addSpecialQuestionState);

  const arr = detailData?.filter((item) => item.category === "스페셜 질문");
  const [isOptionBox, setIsOptionBox] = useState<boolean>(false);
  const SpaceToEditWritePage = () => {
    setDetailModal(false);
    document.body.style.overflowY = "scroll";
    setIsClickArray(
      detailData.filter((item) => item.category === "스페셜 질문").map((obj) => obj.questionId)
    );
    setPostEditWritingData(
      detailData.map((obj) => ({
        userTemplateId: obj.userTemplateId,
        category: obj.category,
        question: obj.question,
        questionId: obj.questionId,
        content: obj.content,
        visibility: obj.visibility === 1 ? true : false, // 예시로 true로 설정했지만 필요에 따라 다른 값으로 설정 가능
      }))
    );
    navigate(`/editwriting/${format(detailData[0]?.createdAt, "yyyy-MM-dd")}`);
  };

  return (
    <Container>
      <div className="top">
        <div className="date">{format(detailData[0]?.createdAt, "M월 d일 회고")}</div>
        {nickName === detailData[0].nickname && (
          <div
            className="option"
            onClick={() => setIsOptionBox(!isOptionBox)}
          >
            <img
              src={optionImg}
              alt=":"
            />
          </div>
        )}
        {isOptionBox && (
          <div
            className="editBox"
            onClick={SpaceToEditWritePage}
          >
            <p>수정하기</p>
            <img
              src={pencilImg}
              alt="."
            />
          </div>
        )}
      </div>
      {arr.length > 0 && (
        <div className="specialQuestion">
          <TitleSideBox type="special">스페셜 질문</TitleSideBox>
          <div className="QuestionBox">
            {arr.map((item, idx) => (
              <div>
                <div className="title">
                  {idx + 1}.{item?.question}
                </div>
                <div className="content">{item?.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="basicQuestion">
        {detailData.filter((item) => item.category !== "스페셜 질문").length > 0 && (
          <TitleSideBox type="special">베이직 질문</TitleSideBox>
        )}
        <div className="QuestionBox">
          {detailData
            .filter((item) => item.category !== "스페셜 질문")
            .map((item, idx) => (
              <div>
                <div className="title">
                  {idx + 1}.{item?.question}
                </div>
                <div className="content">{item?.content}</div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};
