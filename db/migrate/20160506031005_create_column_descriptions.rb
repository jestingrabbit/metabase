class CreateColumnDescriptions < ActiveRecord::Migration
  def change
    create_table :columns do |t|
      t.string :name
      t.string :data_type
      t.integer :rank
      t.string :color
      t.references :table, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
