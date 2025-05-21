class MinesweepersController < ApplicationController
  def generate
    board = Minefield.new(size: 5)
    PlaceMinesService.call(minefield: board, mine_count: 10)
    GenerateCluesService.call(minefield: board)

    render json: board.grid
  end
end
