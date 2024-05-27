import Image from "next/image"
import { useEffect, useState } from "react"

const FadeImagesLoop = ({
  images,
  fade,
  intervalDuration,
}: {
  images: string[]
  fade: boolean
  intervalDuration: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((x) => (x < images.length - 1 ? x + 1 : 0)),
      intervalDuration
    )

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="relative aspect-[5/6] min-w-[35vw]">
      {images.map((image, index) => (
        <div className="absolute right-0 w-full" key={index}>
          <Image
            src={image}
            alt=""
            width={300}
            height={250}
            layout="responsive"
            priority={index === 0 ? true : false}
            className={`transition ${fade ? "duration-700" : "duration-200"} ${
              index === currentIndex ? "opacity-1" : "opacity-0"
            } `}
          />
        </div>
      ))}
    </div>
  )
}

export default FadeImagesLoop
