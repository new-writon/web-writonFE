import { Dispatch, SetStateAction } from "react";

interface HandleKeyDownParams {
  e: React.KeyboardEvent<HTMLTextAreaElement>;
  isComposing: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  updateRecoil: (newValue: string) => void;
}

export function handleMarkdownKeyDown({
  e,
  isComposing,
  text,
  setText,
  updateRecoil,
}: HandleKeyDownParams) {
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

    // 숫자 리스트 자동 증가
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s(.*)$/);
    if (orderedMatch) {
      e.preventDefault();
      const [_, indent, numStr, content] = orderedMatch;
      const num = parseInt(numStr, 10) + 1;
      const before = value.substring(0, start);
      const after = value.substring(end);
      let newValue: string;
      if (content.trim() === "") {
        newValue = before + "\n" + after;
      } else {
        const newLine = `\n${indent}${num}. `;
        newValue = before + newLine + after;
      }
      setText(newValue);
      updateRecoil(newValue);
      return;
    }

    // 불릿/체크박스 리스트 자동
    const listMatch = currentLine.match(/^(\s*)([-*+]|\[ \]|\[x\])\s(.*)$/i);
    if (listMatch) {
      e.preventDefault();
      const [_, indent, marker, content] = listMatch;
      const before = value.substring(0, start);
      const after = value.substring(end);
      let newValue: string;
      if (content.trim() === "") {
        newValue = before + "\n" + after;
      } else {
        const newLine = `\n${indent}${marker} `;
        newValue = before + newLine + after;
      }
      setText(newValue);
      updateRecoil(newValue);
    }
  }
}
