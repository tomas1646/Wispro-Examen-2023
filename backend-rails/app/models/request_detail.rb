class RequestDetail < ApplicationRecord
  belongs_to :plan_request
  belongs_to :internet_plan

  enum status: { pending: 0, approved: 1, rejected: 2, finished: 3 }
end
