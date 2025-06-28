import { renderHook, act, waitFor } from '@testing-library/react'
import { useGameContext } from '../../contexts/GameContext'
import { useFlags } from '../../hooks/useFlags'
import { renderHookWithGameProvider } from '../test-utils'

describe('useFlags', () => {
  const mockOnFlagCellChange = vi.fn()

  it('should flag a cell', async () => {
    const { result } = renderHookWithGameProvider(() => {
      const useFlagsResult = useFlags(mockOnFlagCellChange)
      const useGameContextResult = useGameContext()
      return { useFlagsResult, useGameContextResult}
    })

    act(() => {
      result.current.useFlagsResult.placeFlag('1-1')
    })

    await waitFor(() => {
      expect(result.current.useGameContextResult.flaggedCells.has('1-1')).toBe(true)
    })
    expect(mockOnFlagCellChange).toHaveBeenCalled()
  })
})
