class CreateColumnDescriptions < ActiveRecord::Migration
  def change
    create_table :column_descriptions do |t|
      t.string :name
      t.string :data_type
      t.references :table, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
