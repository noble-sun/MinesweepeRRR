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

  const numberColorClasses: Record<number, string> = {
    1: 'text-blue-600',
    2: 'text-green-800',
    3: 'text-red-700',
    4: 'text-blue-900',
    5: 'text-amber-700',
    6: 'text-cyan-700',
    7: 'text-black',
    8: 'text-purple-700',
  }

  const clueNumberColor = !(clue === null || clue === 0)
    ? numberColorClasses[clue]
    : 'text-neutral-500'

  return (
    <button
      key={`cell-button-${row}-${col}`}
      id={`cell-button-${row}-${col}`}
      className={`!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-600
        flex items-center justify-center !font-bold
        ${isRevealed ? (hasMine ? '!bg-red-700' : '!bg-gray-400') : '!bg-gray-500'}
        ${exploded ? '' : 'hover:!bg-gray-700 active:!bg-gray-800'}}
        ${clueNumberColor}
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
