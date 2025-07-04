import { renderHook, waitFor, act } from '@testing-library/react'
import { useTimer } from '../../hooks/useTimer'

describe('useTimer', () => {
  describe('startTimer', () => {
    describe('when gameIsRunning state is false or null', () => {
      it('define timeRef with an interval to update time state', () => {
        vi.useFakeTimers()

        const { result } = renderHook(() => useTimer())

        expect(result.current.time).toBe(0)

        act(() => {
          result.current.startTimer()
          vi.advanceTimersByTime(3000)
        })

        expect(result.current.time).toBe(3)
        expect(result.current.gameIsRunning).toBe(true)

        vi.useRealTimers()
      })
    })

    describe('when gameIsRunning state is true', () => {
      it('do not restart timer', () => {
        vi.useFakeTimers()
        const { result } = renderHook(() => useTimer())

        act(() => {
          result.current.startTimer()
          vi.advanceTimersByTime(3000)
        })

        act(() => {
          result.current.startTimer()
        })

        expect(result.current.time).not.toBe(0)
        expect(result.current.gameIsRunning).toBe(true)

        vi.useRealTimers()
      })
    })
  })

  describe('stopTimer', () => {
    it('set gameIsRunning to false and stop timer', () => {
      vi.useFakeTimers()

      const { result } = renderHook(() => useTimer())

      act(() => {
        result.current.startTimer()
        vi.advanceTimersByTime(3000)
        result.current.stopTimer()
      })

      act(() => {
        vi.advanceTimersByTime(3000) 
      })
 
      expect(result.current.time).toBe(3)
      expect(result.current.gameIsRunning).toBe(false)

      vi.useRealTimers()
    })
  })
})
