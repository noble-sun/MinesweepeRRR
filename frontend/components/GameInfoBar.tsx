import React, { useState, useEffect, useRef } from 'react'

export default function GameInfoBar( {time}: {time: number}) {
  return (
    <>
      <div className="flex justify-between items-center grow">
        <span> Mines: </span>
        <div className="cursor-pointer"> <i>=O</i> </div>
        <span> Time: {time} </span>
      </div>
    </>
  )
}
