import React, { useState, useEffect, useRef } from 'react'
import smileFaceIcon from '../src/assets/smileFace.svg'
import deadFaceIcon from '../src/assets/deadFace.svg'

export default function GameInfoBar(
  { time, exploded }:
  { time: number, exploded: boolean }
) {
  return (
    <>
      <div className="flex justify-between items-center grow">
        <span> Mines: </span>
        <div className="cursor-pointer">
          { exploded ? <img src={deadFaceIcon}/> : <img src={smileFaceIcon} /> }
        </div>
        <span> Time: {time} </span>
      </div>
    </>
  )
}
