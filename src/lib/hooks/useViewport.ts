import { useEffect, useState } from "react"

export const useViewPort = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const currentWidth =
      window.innerWidth || document.documentElement.clientWidth
    const currentHeight =
      window.innerHeight || document.documentElement.clientHeight
    setDimensions((d) => ({ height: currentHeight, width: currentWidth }))
  }, [])

  useEffect(() => {
    const listener = () => {
      const currentWidth =
        window.innerWidth || document.documentElement.clientWidth
      const currentHeight =
        window.innerHeight || document.documentElement.clientHeight
      setDimensions(() => ({ height: currentHeight, width: currentWidth }))
    }
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [dimensions])

  return { width: dimensions.width, height: dimensions.height }
}
