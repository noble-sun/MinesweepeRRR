import React from 'react'
import { CellProps } from './types'
import flag from '../src/assets/flag.svg'
import questionMark from '../src/assets/questionMark.svg'

export const Cell = (
  {
    row,
    col,
    onClick,
    hasMine,
    clue,
    isRevealed,
    exploded,
    onRightClick,
    flagged,
    questionMarked
  }: CellProps
) => {
  const displayClue = () => { return (clue === 0) ? "" : clue }
  const displayContextValue = () => {
    if(isRevealed) return hasMine ? "*" : displayClue();
    if(flagged) return <img src={flag}/>
    if(questionMarked) return <img src={questionMark} />
    return ""
  }

  return (
    <button
      key={`cell-button-${row}-${col}`}
      id={`cell-button-${row}-${col}`}
      className={`!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-600 text-black
        flex items-center justify-center
        ${isRevealed ? (hasMine ? "!bg-red-700" : "!bg-gray-400") : "!bg-gray-500"}
        ${exploded ? "" : "hover:!bg-gray-700 active:!bg-gray-800"}}
        `}
      onClick={() => onClick(row, col, hasMine)}
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick(row, col)
      }}
      disabled={exploded}
    >
      { displayContextValue() }
    </button>
  )
}

