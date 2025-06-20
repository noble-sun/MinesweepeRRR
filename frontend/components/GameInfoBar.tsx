import React, { useState, useEffect, useRef } from 'react'
import smileFaceIcon from '../src/assets/smileFace.svg'
import deadFaceIcon from '../src/assets/deadFace.svg'

export default function GameInfoBar(
  { time, exploded, mineCount }:
  { time: number, exploded: boolean, mineCount: number }
) {
  return (
    <>
      <div className="flex justify-between items-center grow">
        <span> Mines: {mineCount}</span>
        <div className="cursor-pointer" onClick={() => { window.location.reload() }}>
          { exploded ? <img src={deadFaceIcon}/> : <img src={smileFaceIcon} /> }
        </div>
        <span> Time: {time} </span>
      </div>
    </>
  )
}
