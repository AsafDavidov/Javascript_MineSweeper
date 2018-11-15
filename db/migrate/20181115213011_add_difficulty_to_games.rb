class AddDifficultyToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :difficulty, :string
  end
end
