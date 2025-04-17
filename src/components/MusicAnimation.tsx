import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

export default function MusicAnimation() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    import('../animations/music.json').then((data) => {
      setAnimationData(data.default)
    })
  }, [])

  if (!animationData) return null

  return <Lottie animationData={animationData} loop={true} />
}
