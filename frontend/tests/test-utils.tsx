import React, { ReactNode, forwardRef, useImperativeHandle } from 'react'
import { GameProvider } from '../contexts/GameContext'
import { render } from '@testing-library/react'

type HookResults<T> = { current: T | null }

export function renderHookWithGameContext<T>(
  useHooks: () => T
): HookResults<T> {
  const result: HookResults<T> = { current: null }

  // Component can now receive a ref with forwardRef
  const TestComponent = forwardRef((_, ref) => {
    // Runs the hooks
    const hooks = useHooks()
    // Customize what the ref exposes to the parent. In this case it is exposing
    // the hooks declared above.
    // [hooks] says to only re-render if hooks are updated
    useImperativeHandle(ref, () => hooks, [hooks])
    // Since only the hooks are needed, this will render nothing
    return null
  })

  render(
    <GameProvider>
      <TestComponent ref={(val) => (result.current = val)} />
    </GameProvider>
  )

  return result
}
