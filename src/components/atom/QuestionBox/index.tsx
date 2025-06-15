import { useRef, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { marked } from "marked";
import { postWritingDataState } from "@/recoil/atoms";
import { BasicQuestionType } from "@/types";
import { MainSemiTitle } from "../MainSemiTitle";
import { PublicButton } from "../button";
import { Container, PreviewContent } from "./style";
import { useMarkdown } from "@/hooks/useMarkdown";

// 툴바 타입 명확화
interface ToolbarItem {
  label: string;
  title: string;
  md: string;
  select?: [number, number];
}
const TOOLBAR: ToolbarItem[] = [
  { label: "H", title: "Heading", md: "# " },
  { label: "B", title: "Bold", md: "**텍스트**", select: [2, 5] },
  { label: "I", title: "Italic", md: "*텍스트*", select: [1, 4] },
  { label: "</>", title: "Code", md: "`코드`", select: [1, 3] },
  { label: "Link", title: "Link", md: "[텍스트](url)", select: [1, 4] },
  { label: "List", title: "List", md: "- 항목" },
  { label: "Num", title: "Numbered List", md: "1. 항목" },
  { label: "Quote", title: "Quote", md: "> 인용" },
];

marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: false,
});

export const QuestionBox = ({ data, idx }: { data: BasicQuestionType; idx: number }) => {
  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [postWritingData, setpostWritingData] = useRecoilState(postWritingDataState);
  const [isComposing, setIsComposing] = useState(false);

  const MIN_HEIGHT = 189; // 기본 높이(px)

  // 실시간 Recoil 업데이트
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, questionId: number) => {
    setText(e.currentTarget.value);
    setpostWritingData(
      postWritingData.map((item) =>
        item.questionId === questionId ? { ...item, content: e.currentTarget.value } : item
      )
    );
  };

  // visibility 토글도 실시간 Recoil 업데이트
  const onVisibility = (questionId: number) => {
    setToggleSwitchOn((prev) => {
      setpostWritingData(
        postWritingData.map((item) =>
          item.questionId === questionId ? { ...item, visibility: !prev } : item
        )
      );
      return !prev;
    });
  };

  // 툴바 버튼 클릭 시 마크다운 삽입
  const handleToolbar = (md: string, select?: [number, number]) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newValue = before + md + after;
    setText(newValue);
    setpostWritingData(
      postWritingData.map((item) =>
        item.questionId === data.questionId ? { ...item, content: newValue } : item
      )
    );
    setTimeout(() => {
      textarea.focus();
      if (select) {
        textarea.selectionStart = start + select[0];
        textarea.selectionEnd = start + select[1];
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + md.length;
      }
    }, 0);
  };

  // 한글 IME 조합 상태 핸들러
  const handleCompositionStart = useCallback(() => setIsComposing(true), []);
  const handleCompositionEnd = useCallback(() => setIsComposing(false), []);

  // handleKeyDown (자동 리스트)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isComposing) return;
      if (e.key === "Enter") {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = text;
        let lineStart = start;
        while (lineStart > 0 && value[lineStart - 1] !== "\n") {
          lineStart--;
        }
        const currentLine = value.substring(lineStart, start);
        const listMatch = currentLine.match(/^(\s*)([-*+]|\d+\.)\s(.*)$/);
        if (listMatch) {
          e.preventDefault();
          const [_, indent, marker, content] = listMatch;
          const before = value.substring(0, start);
          const after = value.substring(end);
          let newValue: string;
          if (content.trim() === "") {
            newValue = before + "\n" + after;
          } else {
            const newLine = "\n" + indent + marker + " ";
            newValue = before + newLine + after;
          }
          setText(newValue);
          setpostWritingData(
            postWritingData.map((item) =>
              item.questionId === data.questionId ? { ...item, content: newValue } : item
            )
          );
        }
      }
    },
    [isComposing, text, setText, setpostWritingData, postWritingData, data.questionId]
  );

  // 마크다운 미리보기
  const renderedContent = useMarkdown(text);

  // textarea 자동 높이 조절
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${MIN_HEIGHT}px`;
      if (textarea.scrollHeight > MIN_HEIGHT) {
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }
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
          secret={!toggleSwitchOn}
          state="editWrite"
        />
      </div>
      {/* 탭 */}
      <div style={{ display: "flex", borderBottom: "1px solid #edeef1", marginBottom: 4 }}>
        <button
          type="button"
          style={{
            border: "none",
            background: "none",
            fontWeight: tab === "write" ? 700 : 400,
            color: tab === "write" ? "#1b1d1f" : "#9a9ba3",
            borderBottom: tab === "write" ? "2px solid #6b4ff2" : "2px solid transparent",
            padding: "8px 16px",
            cursor: "pointer",
          }}
          onClick={() => setTab("write")}
        >
          Write
        </button>
        <button
          type="button"
          style={{
            border: "none",
            background: "none",
            fontWeight: tab === "preview" ? 700 : 400,
            color: tab === "preview" ? "#1b1d1f" : "#9a9ba3",
            borderBottom: tab === "preview" ? "2px solid #6b4ff2" : "2px solid transparent",
            padding: "8px 16px",
            cursor: "pointer",
          }}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
      </div>
      {/* 툴바 - 오른쪽 정렬 */}
      {tab === "write" ? (
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            minHeight: 36,
          }}
        >
          {TOOLBAR.map((tool) => (
            <button
              key={tool.label}
              type="button"
              title={tool.title}
              style={{
                border: "none",
                background: "none",
                fontSize: "1rem",
                padding: "4px 8px",
                borderRadius: 4,
                cursor: "pointer",
                color: "#6b4ff2",
                fontWeight: 600,
              }}
              onClick={() => handleToolbar(tool.md, tool.select)}
            >
              {tool.label}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ minHeight: 36, padding: "4px 0 8px 0" }} />
      )}
      {/* 입력창/미리보기 */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => onChange(e, data?.questionId)}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
        placeholder="글을 입력해주세요. 마크다운 문법을 지원합니다."
        style={{
          display: tab === "write" ? "block" : "none",
          overflow: "hidden",
          minHeight: `${MIN_HEIGHT}px`,
        }}
      />
      <PreviewContent
        className="markdown"
        style={{ display: tab === "write" ? "none" : "block" }}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </Container>
  );
};
