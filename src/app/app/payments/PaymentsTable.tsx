import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { Payment } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"
import PaymentDetailsModal from "./PaymentDetailsModal"
import { useContext, useState } from "react"
import { IconType } from "@/components/Icons/Icons"
import { UtilsContext } from "@/lib/context/UtilsContext"
import formatNumberString from "@/lib/utils/formatNumberString"
import NairaSymbol from "@/components/general/NairaSymbol"

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
      rowItemProperty: "createdAt",
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
      sortableBy: false,
      rowItemProperty: "attachments",
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
          No Payments Found
        </h1>
        <h1 className="text-sm">
          All payments for your project will appear here
        </h1>
      </div>
    )
  return (
    <>
      <div className="block rounded-xl bg-white lg:hidden">
        {payments.map((payment, index) => {
          return <MobileRowItem key={index} payment={payment} />
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

function MobileRowItem({ payment }: { payment: Payment }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div
      className="flex items-center gap-4 border-b-[.5px] border-rp-grey-500 p-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl last-of-type:border-none"
      onClick={() => setShowModal(true)}
    >
      <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-rp-green-100 text-white">
        <CategoryIcon width={24} height={24} category={payment.category} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-sm font-semibold">
            <NairaSymbol/> {formatNumberString(payment.amount)}
          </h1>
          <h3 className="flex items-center gap-0.5 text-xs capitalize text-[F0FDF4]">
            <CategoryIcon category={payment.category} width={16} height={16} />
            {payment.category.name ?? "Uncategorised"}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs">
            {formatDateString(new Date(payment.createdAt))}
          </h3>
          <h5>
            <PaymentStatus status={payment.status} />
          </h5>
        </div>
      </div>
      <PaymentDetailsModal
        payment={payment}
        show={showModal}
        closeModal={() => setShowModal(false)}
      />
    </div>
  )
}

function RowItem(payment: Payment) {
  const { status, attachments, createdAt, category, amount } = payment
  const invoice = attachments[0]
  const [showModal, setShowModal] = useState(false)
  const { downloadFile } = useContext(UtilsContext)

  return (
    <tr
      className="[&>td]:py- border-b border-rp-grey-1600 bg-white text-xs last-of-type:border-none hover:cursor-pointer [&>td]:px-6 [&>td]:py-4"
      onClick={() => setShowModal(true)}
    >
      <td className="font-medium text-rp-grey-200">
        <h1 className="font-semibold">{payment.subject}</h1>
        <h3 className="mt-1">
          <NairaSymbol /> {formatNumberString(amount)}
        </h3>
      </td>
      <td className="capitalize">{formatDateString(new Date(createdAt))}</td>
      <td>
        <Category category={category} />
      </td>
      <td>
        <PaymentStatus status={status} />
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation()
          downloadFile &&
            downloadFile({
              fileName: invoice!.link,
              download: true,
              mode: "name",
            })
        }}
      >
        {invoice && (
          <div className="group flex items-center gap-3 font-medium text-rp-grey-200">
            <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-rp-green-200">
              <Icon name="file" width={16} height={16} />
            </div>
            <span className="group-hover:underline">{invoice?.link}</span>
          </div>
        )}
      </td>
      <PaymentDetailsModal
        payment={payment}
        show={showModal}
        closeModal={() => setShowModal(false)}
      />
    </tr>
  )
}

function Category({ category }: Pick<Payment, "category">) {
  const textColor =
    category.name === "accomodation"
      ? "#C11574"
      : category.name === "legal"
        ? "#027A48"
        : category.name === "transportation"
          ? "#5925DC"
          : category.name === "logistics"
            ? "#3538CD"
            : category.name === "production"
              ? "#9C2A10"
              : category.name === "salary"
                ? "#6941C6"
                : "#344054"
  const backColor =
    category.name === "accomodation"
      ? "#FDF2FA"
      : category.name === "legal"
        ? "#ECFDF3"
        : category.name === "transportation"
          ? "#EEF4FF"
          : category.name === "logistics"
            ? "#EEF4FF"
            : category.name === "production"
              ? "#FFFAEB"
              : category.name === "salary"
                ? "#EFF8FF"
                : "#F2F4F7"
  const dotColor =
    category.name === "accomodation"
      ? "#EE46BC"
      : category.name === "legal"
        ? "#32D583"
        : category.name === "transportation"
          ? "#9B8AFB"
          : category.name === "logistics"
            ? "#6172F3"
            : category.name === "production"
              ? "#FD853A"
              : category.name === "salary"
                ? "#2E90FA"
                : " "
  return (
    <div
      style={{ background: backColor, color: textColor }}
      className="flex w-fit items-center gap-1.5 rounded-full py-0.5 pl-1.5 pr-2 font-medium capitalize"
    >
      {category && (
        <div
          className="aspect-square h-1.5 w-1.5 rounded-full"
          style={{ background: dotColor }}
        ></div>
      )}
      {category.name ?? "Uncategorised"}
    </div>
  )
}

function CategoryIcon({
  category,
  width,
  height,
}: Pick<Payment, "category"> & { width: number; height: number }) {
  const category_name: IconType =
    category.name === "accomodation"
      ? "payment_accomodation"
      : category.name === "salary"
        ? "payment_salary"
        : category.name === "transportation"
          ? "payment_transportation"
          : "payment_others"
  return <Icon name={category_name} width={width} height={height} />
}

const PaymentStatus = ({ status }: Pick<Payment, "status">) => {
  const dotColor =
    status === "approved"
      ? "#22C55E"
      : status === "declined"
        ? "#EF4444"
        : status === "pending"
          ? "#F59E0B"
          : ""

  const statusText =
    status === "pending"
      ? "pending"
      : status === "declined"
        ? "declined"
        : status === "approved"
          ? "paid"
          : null
  return (
    <div className="flex items-center gap-1.5 text-xs capitalize text-[#1F2937] md:text-sm">
      <div
        className="aspect-square h-1.5 w-1.5 rounded-full"
        style={{ background: dotColor }}
      ></div>
      {statusText}
    </div>
  )
}
