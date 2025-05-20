class Cell
  def initialize
    @mine = false
    @revealed = false
    @flagged = false
    @clue = 0
  end

  def place_mine; @mine = true end
  def mine?; mine end
  def relealed?; relealed end
  def flagged?; flagged end
  def clue; clue end

  private

  attr_reader :mine, :revealed, :flagged, :clue
end
