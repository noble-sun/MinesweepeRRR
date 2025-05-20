class MinesweepersController < ApplicationController
  def generate
    board = Minefield.new(size: 16)

    render json: board.grid
  end
end
