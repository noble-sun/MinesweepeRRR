class Cell
  def initialize(x:, y:)
    @mine = false
    @revealed = false
    @flagged = false
    @clue = 0
    @x = x
    @y = y
  end

  def neighbors
    [ x-1, x, x+1 ].product([ y-1, y, y+1 ]) - [ [ x, y ] ]
  end

  def add_clue_count; @clue += 1 end
  def place_mine; @mine = true end
  def mine?; mine end
  def relealed?; relealed end
  def flagged?; flagged end
  def clue; clue end

  private

  attr_reader :mine, :revealed, :flagged, :clue, :x, :y
end
