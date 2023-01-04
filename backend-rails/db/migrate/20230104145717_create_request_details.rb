class CreateRequestDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :request_details do |t|
      t.integer :status, default: 0

      t.belongs_to :plan_request
      t.belongs_to :internet_plan

      t.timestamps
    end
  end
end
