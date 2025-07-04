class GenerateCluesService
  def self.call(minefield:)
    new(minefield:).call
  end

  def initialize(minefield:)
    @minefield = minefield
  end

  def call
    @minefield.grid.each do |row|
      row.each do |cell|
        if cell.mine?
          cell.set_clue_as_mine
          next
        end

        neighbors = cell.neighbors.select { |px, py| @minefield.in_bounds?(px, py) }

        neighbors.each do |x, y|
          cell.add_clue_count if @minefield.cell(x, y).mine?
        end
      end
    end

    true
  end
end
