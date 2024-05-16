import Icon from "@/components/Icons/Icon"
import Table, { HeaderItem } from "@/components/general/Table"
import { ProfileLetter } from "@/components/layouts/Projects"
import { Project } from "@/lib/types"
import formatDateString from "@/lib/utils/formatDateString"
import { useMemo, useState } from "react"

interface Props {
  projects: Project[]
}

export default function ProjectsTable({ projects }: Props) {
  // const headerItems: HeaderItem<Project>[] = [
  //   {
  //     label: "Project",
  //     sortableBy: false,
  //     rowItemProperty: "name",
  //   },
  //   {
  //     label: "Earned (N)",
  //     sortableBy: false,
  //     rowItemProperty: "earned_amount",
  //   },
  //   {
  //     label: "Balance (N)",
  //     sortableBy: false,
  //     rowItemProperty: "remaining_balance",
  //   },
  // ]

  if (!projects || projects.length === 0)
    return (
      <div className="flex h-[500px] w-full flex-col items-center justify-center bg-white py-10">
        <img
          src="/images/no_data.png"
          alt="no data found"
          className="h-auto w-[90%] max-w-[172px]"
        />
        <h1 className="mb-1 text-center font-space_grotesk text-xl font-bold text-rp-grey-200">
          No Projects Found
        </h1>
        <h1 className="text-sm">All projects will appear here</h1>
      </div>
    )
  return (
    <>
      <div className="block rounded-xl bg-white lg:hidden">
        {projects.map((project, index) => {
          // return <MobileRowItem key={index} project={project} />
          return <></>
        })}
      </div>
      <div className="hidden lg:block">
        {/* <Table
          headerItems={headerItems}
          rowItems={projects}
          RowItem={RowItem}
          blankColumns={0}
        /> */}
      </div>
    </>
  )
}

// function MobileRowItem({ project }: { project: Project }) {
//   return (
//     <div className="flex items-center gap-4 border-b-[.5px] border-rp-grey-500 p-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl">
//       <ProfileLetter name={project.name} />
//       <div className="flex w-full flex-1 flex-col gap-4">
//         <p className="font-bold text-rp-grey-1100">{project.name}</p>
//         <div className="w-full">
//           <ProgressBar
//             current={project.earned_amount}
//             total={project.earned_amount + project.remaining_balance}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// function RowItem(project: Project) {
//   return (
//     <tr className="[&>td]:py- border-b border-rp-grey-1600 bg-white text-xs last-of-type:border-none hover:cursor-pointer [&>td]:px-6 [&>td]:py-4">
//       <td className="font-medium text-rp-grey-200">
//         <div className="flex items-center justify-between gap-10">
//           <div className="flex items-center gap-4">
//             <ProfileLetter name={project.name} />
//             <p className="font-bold text-rp-grey-1100">
//               {project.name}
//             </p>
//           </div>
//           <div className="w-full max-w-[110px]">
//             <ProgressBar
//               current={project.earned_amount}
//               total={project.earned_amount + project.remaining_balance}
//             />
//           </div>
//         </div>
//       </td>
//       <td className="text-rp-grey-1700 text-sm font-semibold">
//         {project.earned_amount.toLocaleString()}
//       </td>
//       <td className="text-rp-grey-1700 text-sm font-semibold">
//         {project.remaining_balance.toLocaleString()}
//       </td>
//     </tr>
//   )
// }

function ProgressBar({ current, total }: { current: number; total: number }) {
  const width = useMemo(() => `${(current / total) * 100}%`, [current, total])
  return (
    <div className="w-full rounded-full bg-rp-green-500 px-[3px] py-[2px]">
      <div
        style={{ width }}
        className="h-1 -translate-x-[1px]  rounded-full bg-rp-green-100"
      ></div>
    </div>
  )
}
