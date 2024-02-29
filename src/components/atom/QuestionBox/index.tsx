import { useRef, useState } from "react";

import { useRecoilState } from "recoil";

import { postWritingDataState } from "@/recoil/atoms";
import { BasicQuestionType } from "@/types";

import { MainSemiTitle } from "../MainSemiTitle";
import { PublicButton } from "../button";

import { Container } from "./style";

export const QuestionBox = ({ data, idx }: { data: BasicQuestionType; idx: number }) => {
  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [postWritingData, setpostWritingData] = useRecoilState(postWritingDataState);

  const onVisibility = (question_id: number) => {
    setToggleSwitchOn(!toggleSwitchOn);
    setpostWritingData(
      //questionid 가 같은 곳에 visbility 집아넣는다.
      postWritingData?.map((item) =>
        item.question_id === question_id ? { ...item, visibility: toggleSwitchOn } : item
      )
    );
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, question_id: number) => {
    setText(e.currentTarget.value);
    //questionid 가 같은 곳에 content를 집아넣는다.
    setpostWritingData(
      postWritingData.map((item) =>
        item.question_id === question_id ? { ...item, content: e.currentTarget.value } : item
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
          onClick={() => onVisibility(data?.question_id)}
          secret={!toggleSwitchOn}
          state="editWrite"
        />
        {/* <ToggleBtnBox $toggleSwitchOn={toggleSwitchOn}>
          {toggleSwitchOn ? "비공개" : "공개"}
          <label
            className={`toggleSwitch ${toggleSwitchOn && "active"}`}
            onClick={() => onVisibility(data?.question_id)}
          >
            <span className="toggleButton"></span>
          </label>
        </ToggleBtnBox> */}
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => onChange(e, data?.question_id)}
        placeholder="글을 입력해주세요."
      />
    </Container>
  );
};
