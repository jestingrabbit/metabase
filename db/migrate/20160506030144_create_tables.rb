class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|
      t.string :plural
      t.references :database, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
