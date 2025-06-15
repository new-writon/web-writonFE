import { useCallback, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export const useMarkdown = (text: string) => {
  const renderMarkdown = useCallback((markdown: string) => {
    if (!markdown) return "";
    try {
      const rawHtml = marked.parse(markdown);
      if (typeof rawHtml === "string") {
        return DOMPurify.sanitize(rawHtml, {
          ALLOWED_TAGS: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "br",
            "strong",
            "em",
            "del",
            "hr",
            "ul",
            "ol",
            "li",
            "blockquote",
            "code",
            "pre",
            "a",
            "img",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
          ],
          ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target"],
        });
      }
      return "";
    } catch (error) {
      console.error("Markdown parsing error:", error);
      return "";
    }
  }, []);

  const renderedContent = useMemo(() => renderMarkdown(text), [text, renderMarkdown]);

  return renderedContent;
};
