import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { Paperwork } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"

interface Props {
  paperworks: Paperwork[]
}

export default function PaperworkTable({ paperworks }: Props) {
  const headerItems: HeaderItem<Paperwork>[] = [
    {
      label: (
        <span className="flex items-center gap-1 text-xs">
          Document <Icon name="down_arrow" />
        </span>
      ),
      sortableBy: true,
      rowItemProperty: "title",
    },
    {
      label: "Date Uploaded",
      sortableBy: false,
      rowItemProperty: "created_at",
    },
    {
      label: "Last opened",
      sortableBy: false,
      rowItemProperty: "last_opened",
    },
  ]

  if (!paperworks || paperworks.length === 0)
    return (
      <div className="flex h-[500px] w-full flex-col items-center justify-center bg-white py-10">
        <img
          src="/images/no_data.png"
          alt="no data found"
          className="h-auto w-[90%] max-w-[172px]"
        />
        <h1 className="mb-1 text-center font-space_grotesk text-xl font-bold text-rp-grey-200">
          No Documents Found
        </h1>
        <h1 className="text-sm">
          All documents for your project will appear here
        </h1>
      </div>
    )
  return (
    <div className="hidden lg:block">
      <Table
        headerItems={headerItems}
        rowItems={paperworks}
        RowItem={RowItem}
        blankColumns={2}
      />
    </div>
  )
}

function RowItem({ title, created_at, last_opened }: Paperwork) {
  return (
    <tr className="border-rp-grey-1600 [&>td]:py- border-b bg-white text-xs last-of-type:border-none [&>td]:px-6 [&>td]:py-4">
      <td className="font-medium text-rp-grey-200">
        <div className="flex items-center gap-3">
          <div className="bg-rp-green-200 flex aspect-square h-8 w-8 items-center justify-center rounded-full">
            <Icon name="file" width={16} height={16} />
          </div>
          {title}
        </div>
      </td>
      <td className="capitalize">{formatDateString(new Date(created_at))}</td>
      <td className="capitalize">{formatDateString(new Date(last_opened))}</td>

      <td>
        <button className="px-2">
          <Icon name="forward" />
        </button>
      </td>
      <td>
        <button className="px-2">
          <Icon name="three_dot_menu" />
        </button>
      </td>
    </tr>
  )
}
