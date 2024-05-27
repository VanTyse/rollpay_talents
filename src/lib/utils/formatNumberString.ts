export default function formatNumberString(numStr: string): string {
  const number = parseFloat(numStr)

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}
