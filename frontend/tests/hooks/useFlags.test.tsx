import { renderHook, act, waitFor } from '@testing-library/react'
import { useGameContext } from '../../contexts/GameContext'
import { useFlags } from '../../hooks/useFlags'
import { renderHookWithGameContext } from '../test-utils'

describe('useFlags', () => {
  describe('placeFlag', () => {
    it('should flag a cell', async () => {
      const mockOnFlagCellChange = vi.fn()

      const result = renderHookWithGameContext(() => ({
        useFlagsResult: useFlags(mockOnFlagCellChange),
        useGameContextResult: useGameContext()
      }))

      act(() => {
        result.current!.useFlagsResult.placeFlag('1-1')
      })

      await waitFor(() => {
        expect(result.current!.useGameContextResult.flaggedCells.has('1-1')).toBe(true)
      })
      expect(mockOnFlagCellChange).toHaveBeenCalledWith(-1)
    })
  })

  describe('placeQuestionMark', () => {
    describe('when cell key is present on flaggedCells state', () => {
      it('should add cell key on questionMarkedCells state', async () => {
        const mockOnFlagCellChange = vi.fn()
        const key = '1-1'

        const result = renderHookWithGameContext(() => ({
          useFlagsResult: useFlags(mockOnFlagCellChange),
          useGameContextResult: useGameContext()
        }))

        act(() => {
          result.current!.useGameContextResult.setFlaggedCells(prev => new Set(prev).add(key))
        })

        act(() => {
          result.current!.useFlagsResult.placeQuestionMark(key)
        })

        await waitFor(() => {
          expect(result.current!.useGameContextResult.questionMarkedCells.has(key)).toBe(true)
          expect(result.current!.useGameContextResult.flaggedCells.has(key)).toBe(false)
        })
        expect(mockOnFlagCellChange).toHaveBeenCalledWith(1)
      })
    })

    describe('when cell key is not present on flaggedCells state', () => {
      it('should not add cell key on questionMarkedCells state', async () => {
        const mockOnFlagCellChange = vi.fn()
        const key = '1-1'

        const result = renderHookWithGameContext(() => ({
          useFlagsResult: useFlags(mockOnFlagCellChange),
          useGameContextResult: useGameContext()
        }))

        act(() => {
          result.current!.useFlagsResult.placeQuestionMark(key)
        })

        await waitFor(() => {
          expect(result.current!.useGameContextResult.questionMarkedCells.has(key)).toBe(false)
        })
        expect(mockOnFlagCellChange).not.toHaveBeenCalled()
      })
    })
  })
})
