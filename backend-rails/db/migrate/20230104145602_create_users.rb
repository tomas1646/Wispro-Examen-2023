class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.string :token
      t.string :name

      # STI (Singel Table Inheritance)
      t.integer :type

      t.timestamps
    end
  end
end
