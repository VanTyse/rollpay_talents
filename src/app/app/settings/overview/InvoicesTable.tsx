import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { UtilsContext } from "@/lib/context/UtilsContext"
import { Invoice } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"
import { useContext, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  invoices: Invoice[]
}

export default function InvoiceTable({ invoices }: Props) {
  const headerItems: HeaderItem<Invoice>[] = [
    {
      label: (
        <span className="flex items-center gap-1 text-xs">
          Documents <Icon name="down_arrow" />
        </span>
      ),
      sortableBy: true,
      rowItemProperty: "invoiceNumber",
    },
    {
      label: "Date Created",
      sortableBy: false,
      rowItemProperty: "createdAt",
    },
  ]

  if (!invoices || invoices.length === 0)
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
        {invoices.map((invoice, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 border-b-[.5px] border-rp-grey-500 p-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl last-of-type:border-none"
            >
              <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-rp-green-200">
                <Icon name="file" width={16} height={16} />
              </div>
              <div className="flex-1">
                <h1 className="mb-1 text-sm font-semibold">
                  {invoice.invoiceNumber}
                </h1>
                <h3 className="text-xs">
                  Date created {formatDateString(new Date(invoice.createdAt))}
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
          rowItems={invoices}
          RowItem={RowItem}
          blankColumns={1}
        />
      </div>
    </>
  )
}

function RowItem({ invoiceNumber, createdAt, updatedAt, link }: Invoice) {
  const { downloadFile } = useContext(UtilsContext)
  return (
    <tr className="border-b border-rp-grey-1600 bg-white text-xs last-of-type:border-none [&>td]:px-6 [&>td]:py-4">
      <td className="cursor-pointer font-medium text-rp-grey-200">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-rp-green-200">
            <Icon name="file" width={16} height={16} />
          </div>
          {invoiceNumber}
        </div>
      </td>
      <td className="capitalize">{formatDateString(new Date(createdAt))}</td>
      {/* <td className="capitalize">{formatDateString(new Date(updatedAt))}</td> */}

      <td>
        <button
          className="px-2"
          onClick={(e) => {
            e.stopPropagation()
            downloadFile && downloadFile({ link, download: true, mode: "link" })
          }}
        >
          <Icon name="download" />
        </button>
      </td>
      {/* <td>
        <button className="px-2">
          <Icon name="three_dot_menu" />
        </button>
      </td> */}
    </tr>
  )
}

function InvoiceRowOptions({
  invoice,
  closeOptions,
  className,
}: {
  invoice: Invoice
  closeOptions: () => void
  className?: string
}) {
  const { downloadFile } = useContext(UtilsContext)
  const download = () => {
    downloadFile &&
      downloadFile({ link: invoice.link, download: true, mode: "link" })
  }

  useEffect(() => {
    window.addEventListener("click", closeOptions)

    return () => window.removeEventListener("click", closeOptions)
  }, [])
  return (
    <div
      className={twMerge(
        `absolute right-8 top-14 z-10 flex flex-col gap-2 rounded bg-white px-2 py-3 shadow`,
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="flex w-[150px] items-center gap-2 py-2 hover:bg-rp-grey-1000"
        onClick={download}
      >
        <Icon name="download" width={16} height={16} />
        <h1 className="text-xs font-medium text-rp-blue-dark">Download</h1>
      </button>
    </div>
  )
}
