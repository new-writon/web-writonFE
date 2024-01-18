import { useRef, useState } from "react";

import { BasicQuestionType } from "@/types";

import { MainSemiTitle } from "../MainSemiTitle";

import { Container, ToggleBtnBox } from "./style";

export const QuestionBox = ({ data, idx }: { data: BasicQuestionType; idx: number }) => {
  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    // textarea 높이 조절
    // if (textareaRef && textareaRef.current) {
    //   textareaRef.current.style.height = "0px";
    //   const scrollHeight = textareaRef.current.scrollHeight;
    //   textareaRef.current.style.height = scrollHeight + "px";
    // }
  };
  return (
    <Container>
      <div className="title">
        <MainSemiTitle font={1.125}>
          {idx + 1}. {data.question}
        </MainSemiTitle>
        <ToggleBtnBox $toggleSwitchOn={toggleSwitchOn}>
          {toggleSwitchOn ? "비공개" : "공개"}
          <label
            className={`toggleSwitch ${toggleSwitchOn && "active"}`}
            onClick={() => setToggleSwitchOn(!toggleSwitchOn)}
          >
            <span className="toggleButton"></span>
          </label>
        </ToggleBtnBox>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        placeholder="글을 입력해주세요."
      />
    </Container>
  );
};
