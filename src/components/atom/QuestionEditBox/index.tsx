import { useRef, useState } from "react";

import { useRecoilState } from "recoil";

import { postEditWritingDataState } from "@/recoil/atoms";
import { postEditWritingDataType } from "@/types";

import { MainSemiTitle } from "../MainSemiTitle";
import { PublicButton } from "../button";

import { Container } from "./style";

export const QuestionEditBox = ({ data, idx }: { data: postEditWritingDataType; idx: number }) => {
  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(data.visibility);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(data.content);
  const [postEditWritingData, setpostEditWritingData] = useRecoilState(postEditWritingDataState);

  const onVisibility = (questionId: number) => {
    setToggleSwitchOn(!toggleSwitchOn);
    setpostEditWritingData(
      //questionid 가 같은 곳에 visbility 집아넣는다.
      postEditWritingData?.map((item) =>
        item.questionId === questionId ? { ...item, visibility: !toggleSwitchOn } : item
      )
    );
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, questionId: number) => {
    setText(e.currentTarget.value);
    //questionid 가 같은 곳에 content를 집아넣는다.
    setpostEditWritingData(
      postEditWritingData.map((item) =>
        item.questionId === questionId ? { ...item, content: e.currentTarget.value } : item
      )
    );
  };

  return (
    <Container>
      <div className="title">
        <div className="textQuestion">
          <MainSemiTitle font={1.125}>
            {idx + 1}. {data.question}
          </MainSemiTitle>
        </div>
        <PublicButton
          onClick={() => onVisibility(data?.questionId)}
          secret={toggleSwitchOn}
          state="editWrite"
        />
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => onChange(e, data?.questionId)}
        placeholder="글을 입력해주세요."
      />
    </Container>
  );
};
