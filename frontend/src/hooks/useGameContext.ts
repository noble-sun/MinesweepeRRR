import { useContext } from 'react'

import { GameContext } from '../contexts/GameContext'

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    console.trace('useGameContext was called outside GameProvider')
    throw new Error('useGameContext must be within a GameProvider')
  }

  return context
}
