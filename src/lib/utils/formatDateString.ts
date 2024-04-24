const months_short = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

export default function formatDateString(date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const day = date.getDate()

  return `${months_short[month]} ${day}, ${year}`
}
