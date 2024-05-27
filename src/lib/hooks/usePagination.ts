import { useMemo, useState } from "react"
import { ITEMS_PER_PAGE } from "../constants"

export default function usePagination<T>({
  items,
  enabled = true,
}: {
  items: T[]
  enabled: boolean
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const setPage = (page: number) => setCurrentPage(page)
  const lastPage = useMemo(() => Math.ceil(items.length / 10), [items])

  const paginatedItems = useMemo(() => {
    if (!enabled) return items
    return items.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )
  }, [items, currentPage, enabled])

  return { paginatedItems, currentPage, setPage, lastPage }
}
