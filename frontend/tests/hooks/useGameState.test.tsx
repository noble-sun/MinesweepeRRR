import { renderHook, waitFor, act } from '@testing-library/react'
import { useGameState } from '../../src/hooks/useGameState'

describe('useGameState', () => {
  describe('updateMineCount', () => {
    describe('when prop passed is a posivite number', () => {
      it('add to mineCount state', () => {
        const { result } = renderHook(() => useGameState())

        expect(result.current.mineCount).toBe(40)

        act(() => {
          result.current.updateMineCount(1)
        })

        expect(result.current.mineCount).toBe(41)
      })
    })

    describe('when prop passed is a negative number', () => {
      it('decrease from the mineCount state', () => {
        const { result } = renderHook(() => useGameState())

        expect(result.current.mineCount).toBe(40)

        act(() => {
          result.current.updateMineCount(-1)
        })

        expect(result.current.mineCount).toBe(39)
      })
    })
  })

  describe('updateGameStatus', () => {
    describe('when prop is true', () => {
      it('update gameWon status to true', () => {
        const { result } = renderHook(() => useGameState())

        expect(result.current.gameWon).toBe(null)

        act(() => {
          result.current.updateGameStatus(true)
        })

        expect(result.current.gameWon).toBe(true)
      })
    })

    describe('when prop is false', () => {
      it('update gameWon status to false', () => {
        const { result } = renderHook(() => useGameState())

        expect(result.current.gameWon).toBe(null)

        act(() => {
          result.current.updateGameStatus(false)
        })

        expect(result.current.gameWon).toBe(false)
      })
    })
  })

  describe('gameStatusText', () => {
    describe('when gameWon state is null', () => {
      it('quietly return nothing', () => {
        const { result } = renderHook(() => useGameState())

        expect(result.current.gameStatusText()).toBeUndefined
      })
    })

    describe('when gameWon state is true', () => {
      it('return game won text', () => {
        const { result } = renderHook(() => useGameState())

        act(() => {
          result.current.updateGameStatus(true)
        })

        expect(result.current.gameStatusText()).toBe('You Won!!!')
      })
    })

    describe('when gameWon state is false', () => {
      it('return game lost text', () => {
        const { result } = renderHook(() => useGameState())

        act(() => {
          result.current.updateGameStatus(false)
        })

        expect(result.current.gameStatusText()).toBe('You Lost!')
      })
    })
  })
})


