"use client"

import { useState, useEffect } from "react"

// Preload all GIFs and videos
const preloadMedia = () => {
  const allMedia = [
    ...gifImages,
    ...winVideos,
  ]
  allMedia.forEach((src) => {
    if (src.endsWith('.mp4')) {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.src = src
    } else {
      const img = new Image()
      img.src = src
    }
  })
}

const noButtonTexts = [
  "No",
  "Are you sure?",
  "What if I asked really nicely?",
  "Please Miss Paints, I'm begging you!!",
  "But I can't bear the pain of my broken heart!",
  "Could manage a broken ass tho 😉",
  "Fine !! Giving you my credit card!",
  "I'm kidding lol",
  "What about a traditional vietnamese pho?",
  "With a fine glass of Irish whiskey??",
  "Come on Miss Paints!",
  "Stop being a very silly goose",
  "Now.. only death shall cure my despair",
  "Oh, look, I'm DEAD now, congrats'",
  "You think ghosts can still lick feet?",
]

const gifImages = [
  "https://i.imgur.com/bQ27Fko.gif",
  "https://i.imgur.com/3VU3OhT.gif",
  "https://c.tenor.com/73WoNZZmig8AAAAC/tenor.gif",
  "https://i.imgur.com/De4hihz.gif",
  "https://c.tenor.com/kkKmwSdyCLoAAAAd/tenor.gif",
  "https://i.imgur.com/psIop2e.gif",
  "https://c.tenor.com/r53R8b0im3kAAAAd/tenor.gif",
  "https://i.imgur.com/Q0NOE9Y.gif",
  "https://i.imgur.com/ZfAgQ18.gif",
  "https://c.tenor.com/m3xFoB9sKogAAAAd/tenor.gif",
  "https://i.imgur.com/8DRW3rf.gif",
  "https://c.tenor.com/Fqp2e-nCx5IAAAAC/tenor.gif",
  "https://c.tenor.com/ZAvEj5VJvBUAAAAd/tenor.gif",
  "https://i.imgur.com/u8dad12.gif",
  "https://i.imgur.com/6Dt48lj.gif",
]

const winVideos = [
  "https://i.imgur.com/XyluJdU.mp4",
  "https://i.imgur.com/OPxPgSl.mp4",
  "https://i.imgur.com/a4pz1Ah.mp4",
]

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [winVideoIndex, setWinVideoIndex] = useState(0)

  useEffect(() => {
    setWinVideoIndex(Math.floor(Math.random() * winVideos.length))
    preloadMedia()
  }, [])

  const getNoButtonText = () => {
    return noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)]
  }

  const handleNo = () => {
    setNoCount(noCount + 1)
  }

  const handleYes = () => {
    setAccepted(true)
  }

  const handleReplay = () => {
    setAccepted(false)
    setNoCount(0)
    setWinVideoIndex(Math.floor(Math.random() * winVideos.length))
  }

  const yesButtonSize = 1 + noCount * 0.2

  if (accepted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 animate-bounce">
            YAY!!!
          </h1>
          <div className="w-80 h-80 md:w-96 md:h-96 mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl border-4 border-pink-300 animate-bounce">
            <video
              key={winVideoIndex}
              src={winVideos[winVideoIndex]}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-2xl text-pink-500 mb-8 animate-bounce">{"You've just made the happiest sub !!"}</p>
          <button
            onClick={handleReplay}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Replay me !
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
          Artie Paints, will you be my dominatrix?
        </h1>

        <div className="w-72 h-72 md:w-80 md:h-80 mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl border-4 border-pink-300">
          <img
            src={gifImages[Math.min(noCount, gifImages.length - 1)] || "/placeholder.svg"}
            alt="Please say yes"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-8">
          <div 
            className="flex items-center justify-center"
            style={{
              minWidth: `${Math.max(120, 120 * yesButtonSize)}px`,
              minHeight: `${Math.max(50, 50 * yesButtonSize)}px`,
            }}
          >
            <button
              onClick={handleYes}
              style={{
                transform: `scale(${yesButtonSize})`,
              }}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            >
              Yes
            </button>
          </div>

          {noCount < noButtonTexts.length && (
            <button
              onClick={handleNo}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              {getNoButtonText()}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
