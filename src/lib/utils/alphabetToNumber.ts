export default function alphabetToNumber(letter: string): number {
  const lowercaseLetter = letter.toLowerCase()
  const asciiCodeOfA = "a".charCodeAt(0)
  const asciiCodeOfLetter = lowercaseLetter.charCodeAt(0)
  const number = asciiCodeOfLetter - asciiCodeOfA + 1
  return number
}
