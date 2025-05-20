class Minefield
  attr_reader :size, :grid

  def initialize(size:)
    @size = size
    @grid = Array.new(size) { Array.new(size) { Cell.new } }
  end
end
