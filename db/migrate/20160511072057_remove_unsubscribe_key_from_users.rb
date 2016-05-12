class RemoveUnsubscribeKeyFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :unsubscribe_key, :string
  end
end
