import React from 'react'

import flag from '../assets/flag.svg'
import mine from '../assets/mine.svg'
import questionMark from '../assets/questionMark.svg'
import { CellProps } from './Cell.types.tsx'

export const Cell = ({
  row,
  col,
  onClick,
  hasMine,
  clue,
  isRevealed,
  exploded,
  onRightClick,
  flagged,
  questionMarked,
}: CellProps) => {
  const displayClue = () => {
    return clue === 0 ? '' : clue
  }
  const displayContextValue = () => {
    if (isRevealed) return hasMine ? <img src={mine} alt="mine" /> : displayClue()
    if (flagged) return <img src={flag} alt="flag" />
    if (questionMarked) return <img src={questionMark} alt="questionMark" />
    return ''
  }

  return (
    <button
      key={`cell-button-${row}-${col}`}
      id={`cell-button-${row}-${col}`}
      className={`!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-600 text-black
        flex items-center justify-center
        ${isRevealed ? (hasMine ? '!bg-red-700' : '!bg-gray-400') : '!bg-gray-500'}
        ${exploded ? '' : 'hover:!bg-gray-700 active:!bg-gray-800'}}
        `}
      onClick={() => onClick(row, col, hasMine)}
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick(row, col)
      }}
      disabled={exploded}
    >
      {displayContextValue()}
    </button>
  )
}
