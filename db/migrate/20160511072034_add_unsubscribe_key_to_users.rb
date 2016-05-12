class AddUnsubscribeKeyToUsers < ActiveRecord::Migration
  def change
    add_column :users, :unsubscribe_key, :string
  end
end
