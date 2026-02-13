import { useEffect, useState } from "react"

const slides = [
  "https://picsum.photos/900/600?1",
  "https://picsum.photos/900/600?2",
  "https://picsum.photos/900/600?3",
]

export default function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="carousel">
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`slide ${i === index ? "active" : ""}`}
        />
      ))}
    </div>
  )
}
