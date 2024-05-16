"use client"
import Icon from "../Icons/Icon"

const Pagination = ({
  setPage,
  currentPage,
  lastPage,
}: {
  setPage: (page: number) => void
  currentPage: number
  lastPage: number
}) => {
  const handlePrev = () => currentPage > 1 && setPage(currentPage - 1)
  const handleNext = () => currentPage < lastPage && setPage(currentPage + 1)

  return (
    <div className="flex items-center justify-between gap-3">
      <button
        className="flex items-center justify-center gap-2 rounded-lg border border-rp-grey-border bg-white px-3.5 py-2 shadow-input"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <Icon name="arrow_left" color="#344054" />
        <span className="text-sm font-medium">Previous</span>
      </button>
      <PaginationRange
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      <button
        className="flex items-center justify-center gap-2 rounded-lg border border-rp-grey-border bg-white px-3.5 py-2 shadow-input"
        onClick={handleNext}
        disabled={currentPage >= lastPage}
      >
        <span className="text-sm font-medium">Next</span>
        <Icon name="arrow_right" />
      </button>
    </div>
  )
}

const PaginationRange = ({
  currentPage,
  setPage,
  lastPage,
}: {
  currentPage: number
  lastPage: number
  setPage: (page: number) => void
}) => {
  let firstEllipseRendered = false
  let lastEllipseRendered = false

  return (
    <div className="flex flex-1 items-center justify-center gap-2">
      {Array(lastPage)
        .fill(null)
        .map((_, index) => {
          const page = index + 1
          if (page === currentPage) {
            return (
              <button
                key={page}
                onClick={() => setPage(page)}
                className="bg-green flex h-10 w-10 items-center justify-center rounded-lg bg-rp-grey-1000 text-rp-primary"
              >
                {page}
              </button>
            )
          }
          if (page === 1)
            return (
              <button
                key={page}
                onClick={() => setPage(page)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
              >
                1
              </button>
            )
          if (page === lastPage)
            return (
              <button
                key={page}
                onClick={() => setPage(page)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
              >
                {lastPage}
              </button>
            )

          if (Math.abs(page - currentPage) <= 2) {
            return (
              <button
                key={page}
                onClick={() => setPage(page)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
              >
                {page}
              </button>
            )
          }
          if (page - currentPage < 0 && !firstEllipseRendered) {
            firstEllipseRendered = true
            return <div key={page + "first"}>...</div>
          }
          if (
            Math.abs(page - currentPage) > 2 &&
            page === lastPage - 1 &&
            !lastEllipseRendered
          ) {
            lastEllipseRendered = true
            return <div key={page + "last"}>...</div>
          }
        })}
    </div>
  )
}

export default Pagination
