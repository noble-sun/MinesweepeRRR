require "rails_helper"

RSpec.describe Cell do
  describe "#place_mine" do
    context "change the status of the mine to true" do
      it "successfully" do
        cell = Cell.new(x: 0, y: 0)

        expect(cell.place_mine).to be_truthy
      end
    end
  end

  describe "#mine?" do
    context "return false when there isn't a mine" do
      it "successfully" do
        cell = Cell.new(x: 0, y: 0)

        expect(cell.mine?).to be_falsy
      end
    end

    context "return true after a mine was placed on the cell" do
      it 'successfully' do
        cell = Cell.new(x: 0, y: 0)
        cell.place_mine

        expect(cell.mine?).to be_truthy
      end
    end
  end

  describe "#add_clue_count" do
    context "add one more to clue count" do
      it "successfully" do
        cell = Cell.new(x: 0, y: 0)

        expect { cell.add_clue_count }.to change { cell.clue_count }.by(1)
      end
    end

    context "when the cell has a mine" do
      context "does not allow to add a clue count" do
        it "successfully" do
          cell = Cell.new(x: 0, y: 0)
          cell.place_mine

          expect { cell.add_clue_count }
            .to raise_error(AddClueError, "Cannot add clue when there's a mine")
        end
      end
    end
  end

  describe "#clue_count" do
    context "return the clue count number" do
      it "successfully" do
        cell = Cell.new(x: 0, y: 0)
        cell.add_clue_count
        cell.add_clue_count

        expect(cell.clue_count).to eq(2)
      end
    end
  end

  describe "#set_clue_as_mine" do
    context "define clue as nill" do
      it "successfully" do
        cell = Cell.new(x: 0, y: 0)
        cell.place_mine

        expect(cell.set_clue_as_mine).to be_nil
      end
    end

    context "when there isn't a mine on cell" do
      it "does not update clue value and raise error" do
        cell = Cell.new(x: 0, y: 0)

        expect { cell.set_clue_as_mine }
          .to raise_error(NoMineError, "Cannot define clue as mine when there isn't a mine placed")
      end
    end
  end
end
