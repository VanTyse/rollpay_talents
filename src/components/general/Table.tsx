export interface HeaderItem<T> {
  label: string | React.ReactNode
  sortableBy: boolean
  rowItemProperty: keyof T
}

interface TableProps<T> {
  headerItems: HeaderItem<T>[]
  blankColumns: number
  rowItems: T[]
  RowItem: (props: T) => JSX.Element
}

export default function Table<T>({
  headerItems,
  rowItems,
  RowItem,
  blankColumns = 0,
}: TableProps<T>) {
  return (
    <table className="min-h-40 w-full table-auto">
      <thead className="bg-rp-grey-1000 text-xs text-rp-grey-200">
        <tr>
          {headerItems.map((headerItem, index) => (
            <th
              className={`px-6 py-3 text-start ${headerItem.sortableBy && "cursor-pointer"}`}
              key={index}
            >
              {headerItem.label}
            </th>
          ))}
          {Array(blankColumns)
            .fill(0)
            .map((_, index) => (
              <th className="w-[72px] px-3 py-3" key={index}></th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rowItems.map((item, index) => (
          <RowItem {...item} key={index} />
        ))}
      </tbody>
    </table>
  )
}
