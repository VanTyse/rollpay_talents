import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { Payment } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"

interface Props {
  payments: Payment[]
}

export default function PaymentsTable({ payments }: Props) {
  const headerItems: HeaderItem<Payment>[] = [
    {
      label: "Amount (#)",
      sortableBy: false,
      rowItemProperty: "amount",
    },
    {
      label: "Date",
      sortableBy: false,
      rowItemProperty: "created_at",
    },
    {
      label: "Category",
      sortableBy: false,
      rowItemProperty: "category",
    },
    {
      label: "Status",
      sortableBy: false,
      rowItemProperty: "status",
    },
    {
      label: (
        <span className="flex items-center gap-1 text-xs">
          Invoice <Icon name="down_arrow" />
        </span>
      ),
      sortableBy: true,
      rowItemProperty: "invoice",
    },
  ]

  if (!payments || payments.length === 0)
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
        {payments.map((Payment, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 border-b-[.5px] border-rp-grey-500 p-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl last-of-type:border-none"
            >
              <div className="bg-rp-green-200 flex aspect-square h-8 w-8 items-center justify-center rounded-full">
                <Icon name="file" width={16} height={16} />
              </div>
              <div className="flex-1">
                <div>
                  <h1 className="mb-1 text-sm font-semibold">
                    N{Payment.amount}
                  </h1>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs">
                    {formatDateString(new Date(Payment.created_at))}
                  </h3>
                </div>
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
          rowItems={payments}
          RowItem={RowItem}
          blankColumns={0}
        />
      </div>
    </>
  )
}

function RowItem({ status, invoice, created_at, category, amount }: Payment) {
  return (
    <tr className="border-rp-grey-1600 [&>td]:py- border-b bg-white text-xs last-of-type:border-none [&>td]:px-6 [&>td]:py-4">
      <td className="font-medium text-rp-grey-200">
        {amount.toLocaleString()}
      </td>
      <td className="capitalize">{formatDateString(new Date(created_at))}</td>
      <td>{category}</td>
      <td>{status}</td>
      <td>
        <div className="flex items-center gap-3 font-medium text-rp-grey-200">
          <div className="bg-rp-green-200 flex aspect-square h-8 w-8 items-center justify-center rounded-full">
            <Icon name="file" width={16} height={16} />
          </div>
          {invoice.title}
        </div>
      </td>
    </tr>
  )
}
