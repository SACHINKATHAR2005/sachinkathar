"use client"

import { useRef, useState } from 'react'
import { Play, Pause, Music2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function InlineMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="bg-background text-white no-underline hover:no-underline hover:bg-background hover:text-white"
      >
        {playing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
        <Music2 className="w-4 h-4 mr-2" />
        <div className="relative overflow-hidden w-40">
          <span className="marquee text-sm">
            RED - Seedhe Maut • RED - Seedhe Maut • RED - Seedhe Maut •
          </span>
        </div>
      </Button>
      <audio ref={audioRef} src="https://res.cloudinary.com/dzlvf9qm5/video/upload/v1756062935/SpotiDownloader.com_-_RED_-_Seedhe_Maut_xwibxs.mp3" preload="none" />
    </div>
  )
}
