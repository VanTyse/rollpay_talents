"use server"

import { redirect } from "next/navigation"

export default async function Home() {
  redirect("/app")
  return <main>Welcome</main>
}
