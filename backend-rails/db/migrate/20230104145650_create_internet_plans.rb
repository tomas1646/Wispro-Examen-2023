class CreateInternetPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :internet_plans do |t|
      t.string :description
      t.float :price

      t.belongs_to :user

      t.timestamps
    end
  end
end
