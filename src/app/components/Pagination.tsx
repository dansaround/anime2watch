import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  pagesToRender: number[];
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

export function Pagination({
  currentPage,
  lastPage,
  pagesToRender,
  onPageChange,
  hasNextPage,
}: PaginationProps) {
  //label the logs and put in diferent line with /n
  console.log(
    `currentPage: ${currentPage}\nlastPage: ${lastPage}\npagesToRender: ${pagesToRender}\nhasNextPage: ${hasNextPage}`
  );

  return (
    <div className="flex items-center justify-start gap-5 mt-4">
      {/* Button to navigate to the previous page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center"
      >
        <BsChevronCompactLeft />
      </button>

      {/* Render pagination numbers */}
      <div className="flex items-center gap-2">
        {/* Show "1" and ellipsis if the first page is not visible */}
        {!pagesToRender.includes(1) && (
          <>
            <button onClick={() => onPageChange(1)}>1</button>
            <span>...</span>
          </>
        )}

        {/* Render the range of pages */}
        {pagesToRender.map((page, index) => (
          <button
            key={index}
            onClick={() => {
              onPageChange(page);
              console.log("las páginas a cambiar :\n", page, currentPage);
            }}
            className={`px-2 py-1 ${
              page === currentPage ? "font-bold underline" : ""
            }`}
          >
            {page}
          </button>
        ))}

        {/* Show the last page and ellipsis if it's not visible */}
        {!pagesToRender.includes(lastPage) && (
          <>
            <span>...</span>
            <button onClick={() => onPageChange(lastPage)}>{lastPage}</button>
          </>
        )}
      </div>

      {/* Button to navigate to the next page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center"
      >
        <BsChevronCompactRight />
      </button>
    </div>
  );
}
