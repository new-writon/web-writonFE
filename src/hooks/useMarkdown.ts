import { useCallback, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

// marked 설정은 전역 1회만 하면 충분
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true,
});

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
            "input",
          ],
          ALLOWED_ATTR: [
            "href",
            "src",
            "alt",
            "title",
            "class",
            "target",
            "type",
            "checked",
            "disabled",
          ],
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
