class CreateAssociations < ActiveRecord::Migration
  def change
    create_table :associations do |t|
      t.integer :from_id
      t.integer :to_id
      t.boolean :from_crow
      t.boolean :to_crow
      t.integer :from_x
      t.integer :from_y
      t.integer :from_dx
      t.integer :from_dy
      t.integer :to_x
      t.integer :to_y
      t.integer :to_dx
      t.integer :to_dy
      t.string :color
      t.references :database, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
