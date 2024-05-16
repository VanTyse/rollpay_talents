import Icon from "@/components/Icons/Icon"
import { UtilsContext } from "@/lib/context/UtilsContext"
import Link from "next/link"
import { useContext, useState } from "react"

export default function SettingsHelpPage() {
  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static md:h-auto md:w-auto
        md:bg-inherit md:px-0 md:py-0"
    >
      <div className="relative mb-8 flex items-center md:hidden">
        <Link href={"/app/settings"}>
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-4 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Help
        </h1>
      </div>

      <div className="rounded-xl bg-white"></div>
    </main>
  )
}

// const Questions = () => {
//   const { faqs } = useContext(UtilsContext)
//   const [expandQuestionIndex, setExpandQuestionIndex] = useState(-1)

//   const questionClick = (index: number) => {
//     if (expandQuestionIndex === index) setExpandQuestionIndex(-1)
//     else setExpandQuestionIndex(index)
//   }
//   return (
//     <div>
//       {faqs.map((faq, index) => (
//         <div
//           onClick={() => questionClick(index)}
//           className="flex flex-col gap-2"
//         >
//           <div className="flex justify-between">
//             <h1 className={`flex-1`}>{faq.question}</h1>
//             {expandQuestionIndex === index ? (
//               <Icon name="" />
//             ) : (
//               <Icon name="caret_down" />
//             )}
//           </div>
//           <h3>{faq.answer}</h3>
//         </div>
//       ))}
//     </div>
//   )
// }
