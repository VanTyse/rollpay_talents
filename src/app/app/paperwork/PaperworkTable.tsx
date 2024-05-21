import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { UtilsContext } from "@/lib/context/UtilsContext"
import { Paperwork } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"
import { useContext } from "react"

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
      rowItemProperty: "name",
    },
    {
      label: "Date Uploaded",
      sortableBy: false,
      rowItemProperty: "createdAt",
    },
    {
      label: "Last opened",
      sortableBy: false,
      rowItemProperty: "updatedAt",
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
    <>
      <div className="block rounded-xl bg-white lg:hidden">
        {paperworks.map((paperwork, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 border-b-[.5px] border-rp-grey-500 p-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl last-of-type:border-none"
            >
              <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-rp-green-200">
                <Icon name="file" width={16} height={16} />
              </div>
              <div className="flex-1">
                <h1 className="mb-1 text-sm font-semibold">{paperwork.name}</h1>
                <h3 className="text-xs">
                  Last updated {formatDateString(new Date(paperwork.updatedAt))}
                </h3>
              </div>
              <button>
                <Icon name="three_dot_menu" />
              </button>
            </div>
          )
        })}
      </div>
      <div className="hidden lg:block">
        <Table
          headerItems={headerItems}
          rowItems={paperworks}
          RowItem={RowItem}
          blankColumns={2}
        />
      </div>
    </>
  )
}

function RowItem({ name, createdAt, updatedAt }: Paperwork) {
  const { downloadFile } = useContext(UtilsContext)
  return (
    <tr className="[&>td]:py- border-b border-rp-grey-1600 bg-white text-xs last-of-type:border-none [&>td]:px-6 [&>td]:py-4">
      <td
        className="cursor-pointer font-medium text-rp-grey-200"
        onClick={(e) => {
          e.stopPropagation()
          downloadFile &&
            downloadFile({ fileName: name, download: true, mode: "name" })
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-rp-green-200">
            <Icon name="file" width={16} height={16} />
          </div>
          {name}
        </div>
      </td>
      <td className="capitalize">{formatDateString(new Date(createdAt))}</td>
      <td className="capitalize">{formatDateString(new Date(updatedAt))}</td>

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
