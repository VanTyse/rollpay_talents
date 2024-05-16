export default function dataURItoFile(dataURI: string, filename: string): File {
  const base64Data = dataURI.split(",")[1]

  const byteArray = Buffer.from(base64Data, "base64")

  const blob = new Blob([byteArray], { type: "image/png" }) // Adjust the type accordingly

  const file = new File([blob], filename, { type: "image/png" }) // Adjust the type accordingly

  return file
}
