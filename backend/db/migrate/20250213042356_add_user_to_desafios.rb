class AddUserToDesafios < ActiveRecord::Migration[8.0]
  def change
    add_reference :desafios, :user, null: false, foreign_key: true
  end
end
