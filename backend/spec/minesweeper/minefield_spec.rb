require "rails_helper"

RSpec.describe Minefield do
  describe "initialize object" do
    context "with a grid of Cells" do
      it "successfully" do
        minefield = Minefield.new(size: 2)

        minefield.grid.flatten.each do |cell|
          expect(cell.class).to be(Cell)
        end
      end
    end
  end

  describe "#cell" do
    context "access a given cell on the grid" do
      it "successfully" do
        minefield = Minefield.new(size: 2)

        cell = minefield.cell(1, 0)

        expect(cell.instance_variable_get(:@x)).to eq(1)
        expect(cell.instance_variable_get(:@y)).to eq(0)
      end

      context "when coordinates are outside grid limits" do
        it "raise error" do
          minefield = Minefield.new(size: 2)

          expect { minefield.cell(3, 3) }
            .to raise_error(CellOutOfBoundsError, "Cell outside grid limits")
        end
      end
    end
  end

  describe "#clear_field" do
    context "clear the grid and generate new empty one" do
      it "successfully" do
        minefield = Minefield.new(size: 2)
        minefield.cell(0, 0).place_mine
        minefield.cell(0, 1).add_clue_count

        minefield.clear_field

        minefield.grid.flatten.each do |cell|
          expect(cell.mine?).to be_falsy
          expect(cell.clue_count).to eq(0)
        end
      end
    end
  end

  describe "#mine_count" do
    context "return the total number or mines on the field" do
      it "successfully" do
        minefield = Minefield.new(size: 2)
        minefield.cell(0, 0).place_mine
        minefield.cell(1, 0).place_mine

        expect(minefield.mine_count).to eq(2)
      end
    end
  end

  describe "#in_bounds?" do
    context "when coordinates are outside the limits of the grid" do
      it "return false successfully" do
        minefield = Minefield.new(size: 2)

        expect(minefield.in_bounds?(2, 1)).to be_falsy
      end
    end

    context "when coordinates are inside the limits of the grid" do
      it "return true successfully" do
        minefield = Minefield.new(size: 2)

        expect(minefield.in_bounds?(1, 1)).to be_truthy
      end
    end
  end
end
