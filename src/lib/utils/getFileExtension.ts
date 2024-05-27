export default function getFileExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".")
  return dotIndex !== -1 ? filename.substring(dotIndex + 1) : ""
}
