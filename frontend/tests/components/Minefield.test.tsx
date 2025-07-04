import React from 'react'
import { render, screen } from '@testing-library/react'
import Minefield from '../../src/components/Minefield'
import { GameProvider } from '../../src/contexts/GameContext.tsx'
import * as useCellInteractionModule from '../../src/hooks/useCellInteraction'
import * as useMinefieldModule from '../../src/hooks/useMinefield'
import * as useGameContextModule from '../../src/hooks/useGameContext'

describe('Minefield component', () => {
  describe('when call from API finished processing', () => {
    describe('when safeUnrevealedCells state is empty', () => {
      it('calls function that triggers winning game side effects', () => {
        const currentGameWonMock = vi.fn()
        vi.spyOn(useCellInteractionModule, 'useCellInteraction').mockReturnValue({
          onClick: vi.fn(),
          onRightClick: vi.fn(),
          currentGameWon: currentGameWonMock
        })

        const minefield = [
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}],
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}],
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}]
        ]
        vi.spyOn(useMinefieldModule, 'useMinefield').mockReturnValue({
          minefield: minefield
        })

        render(
          <GameProvider>
            <Minefield
              startTimer={ vi.fn() }
              stopTimer={ vi.fn() }
              gameIsRunning={ true }
              onExplode={ vi.fn() }
              exploded={ false }
              onFlagCellChange={ vi.fn() }
              gameWon={ vi.fn() }
            />
          </GameProvider>
        )

        expect(currentGameWonMock).toHaveBeenCalled()
        expect(screen.getAllByRole('button')).toHaveLength(9)
      })
    })

    describe('when safeUnrevealedCells state still has cell keys', () => {
      it('does not call game winning function', () => {
        const currentGameWonMock = vi.fn()
        vi.spyOn(useCellInteractionModule, 'useCellInteraction').mockReturnValue({
          onClick: vi.fn(),
          onRightClick: vi.fn(),
          currentGameWon: currentGameWonMock
        })

        const minefield = [
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}],
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}],
          [{mine: false, clue: 0},{mine: false, clue: 0},{mine: false, clue: 0}]
        ]
        vi.spyOn(useMinefieldModule, 'useMinefield').mockReturnValue({
          minefield: minefield
        })

        vi.spyOn(useGameContextModule, 'useGameContext').mockReturnValue({
          revealedCells: new Set<string>(),
          flaggedCells: new Set<string>(),
          questionMarkedCells: new Set<string>(),
          safeUnrevealedCells: new Set(['0-0']),
        })

        render(
          <GameProvider>
            <Minefield
              startTimer={ vi.fn() }
              stopTimer={ vi.fn() }
              gameIsRunning={ true }
              onExplode={ vi.fn() }
              exploded={ false }
              onFlagCellChange={ vi.fn() }
              gameWon={ vi.fn() }
            />
          </GameProvider>
        )

        expect(currentGameWonMock).not.toHaveBeenCalled()
        expect(screen.getAllByRole('button')).toHaveLength(9)
      })
    })
  })

  describe('when call from API have not yet updated the minefield state', () => {
    it('do not render Cells and do not call game winning function', () => { 
      const currentGameWonMock = vi.fn()
      vi.spyOn(useCellInteractionModule, 'useCellInteraction').mockReturnValue({
        onClick: vi.fn(),
        onRightClick: vi.fn(),
        currentGameWon: currentGameWonMock
      })

      vi.spyOn(useMinefieldModule, 'useMinefield').mockReturnValue({
        minefield: []
      })

      render(
        <GameProvider>
          <Minefield
            startTimer={ vi.fn() }
            stopTimer={ vi.fn() }
            gameIsRunning={ true }
            onExplode={ vi.fn() }
            exploded={ false }
            onFlagCellChange={ vi.fn() }
            gameWon={ vi.fn() }
          />
        </GameProvider>
      )

      expect(currentGameWonMock).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
