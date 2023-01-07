class CreatePlanRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :plan_requests do |t|
      t.integer :status, default: 0

      t.belongs_to :user

      t.timestamps
    end
  end
end
