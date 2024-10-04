import styled from "styled-components";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageLength: number;
}

export const Pagination = ({ page, setPage, pageLength }: PaginationProps) => {
  //pagination 로직
  const pages = [];
  let pageCount;
  if (pageLength % 10 === 0) {
    pageCount = Math.floor(pageLength / 10);
  } else {
    if (Math.floor(pageLength / 10) === 0) {
      pageCount = 1;
    } else {
      pageCount = Math.floor(pageLength / 10) + 1;
    }
  }
  for (let i = 0; i < pageCount; i++) {
    pages.push(
      <div
        className={`${page === i + 1 ? "active" : "notactive"} page`}
        onClick={() => {
          setPage(i + 1);
          window.scrollTo({ top: 0 });
        }}
        key={i}
      >
        {i + 1}
      </div>
    );
  }

  return <Container>{pages}</Container>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  .page {
    padding: 7px 6px;
    color: var(--Gray-80, #464c52);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
    cursor: pointer;
  }
  .notactive {
  }
  .page:hover {
    border-radius: 6px;
    background: var(--Gray-20, #f8f8fa);
  }
  .page.active {
    color: var(--Main-50, #6272ff);
  }
`;
