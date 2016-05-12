class AddColorIndexToDatabases < ActiveRecord::Migration
  def change
    add_column :databases, :color_index, :integer
  end
end
