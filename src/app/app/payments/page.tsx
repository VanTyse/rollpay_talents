import Icon from "@/components/Icons/Icon"
import PaymentsTable from "./PaymentsTable"
import { payments } from "@/lib/mockData"

export default function Payments() {
  return (
    <main className="pb-32 md:pb-0">
      <header className="mb-4 flex items-start justify-between pt-6 md:mb-4 md:pb-3 lg:bg-inherit lg:px-4">
        <div>
          <h1 className="mb-1 font-space_grotesk text-xl font-bold text-rp-grey-200 md:text-[30px]">
            Payments
          </h1>
          <h3>Track all the payments you receive on this project here</h3>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <button className="flex items-center gap-2 rounded-lg bg-rp-blue-dark px-4 py-2.5 text-sm font-medium text-white shadow-input">
            Request Payment
          </button>
        </div>
      </header>

      <PaymentsTable payments={payments} />
    </main>
  )
}
