const months_short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function formatDateString(date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const day = date.getDate()

  return `${months_short[month]} ${day}, ${year}`
}
