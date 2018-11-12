class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :time_taken
      t.boolean :winner

      t.timestamps
    end
  end
end
