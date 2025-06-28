import React, { ReactNode } from 'react'
import { GameProvider } from '../contexts/GameContext'
import { renderHook, RenderHookResult } from '@testing-library/react'

export const gameContextWrapper = ({ children }: { children: ReactNode }) => {
  return <GameProvider>{children}</GameProvider>
}

export const renderHookWithGameProvider = <T,>(
  hook: () => T
): RenderHookResult<unknown, T> => {
    return renderHook(hook, { wrapper: gameContextWrapper })
}
