class PlanRequest < ApplicationRecord
  belongs_to :user
  belongs_to :internet_plan
  has_many :request_details

  enum status: { pendingApproval: 0, pendingModification: 1, approved: 2, rejected: 3, finished: 4 }
end
