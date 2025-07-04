import React from 'react'
import { render, screen } from '@testing-library/react'
import GameInfoBar from '../../components/GameInfoBar'

describe('GameInfoBar component', () => {
  it("renders 'time' prop", () => {
    render(
      <GameInfoBar
        time={ 999 }
        exploded={ false }
        mineCount={ 0 }
      />
    )

    expect(screen.getByText('Time: 999')).toBeInTheDocument()
  })

  it("renders 'mineCount' prop", () => {
    render(
      <GameInfoBar
        time={ 0 }
        exploded={ false }
        mineCount={ 10 }
      />
    )

    expect(screen.getByText('Mines: 10')).toBeInTheDocument()
  })

  describe("when 'exploded' prop is true", () => {
    it('render dead face icon', () => {
      render(
        <GameInfoBar
          time={ 0 }
          exploded={ true }
          mineCount={ 0 }
        />
      )

      expect(screen.getByRole('img')).toHaveAttribute('src')
      expect(screen.getByAltText('dead face')).toBeInTheDocument()
    })
  })

  describe("when 'exploded' prop is false", () => {
    it('render dead face icon', () => {
      render(
        <GameInfoBar
          time={ 0 }
          exploded={ false }
          mineCount={ 0 }
        />
      )

      expect(screen.getByRole('img')).toHaveAttribute('src')
      expect(screen.getByAltText('smile face')).toBeInTheDocument()
    })
  })
})
