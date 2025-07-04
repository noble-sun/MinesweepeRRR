import React from 'react'

import deadFaceIcon from '../assets/deadFace.svg'
import smileFaceIcon from '../assets/smileFace.svg'

export default function GameInfoBar({
  time,
  exploded,
  mineCount,
}: {
  time: number
  exploded: boolean
  mineCount: number
}) {
  const paddedTime = time.toString().padStart(3, '0')
  return (
    <>
      <div className="flex justify-between items-center py-3">
        <span className="flex flex-1 justify-center border p-2"> Mines: {mineCount}</span>
        <div
          className="cursor-pointer flex flex-1 justify-center"
          onClick={() => {
            window.location.reload()
          }}
        >
          {exploded ? (
            <img src={deadFaceIcon} alt="dead face" />
          ) : (
            <img src={smileFaceIcon} alt="smile face" />
          )}
        </div>
        <span className="flex flex-1 justify-center border p-2"> Time: {paddedTime} </span>
      </div>
    </>
  )
}
