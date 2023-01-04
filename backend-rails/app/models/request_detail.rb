class RequestDetail < ApplicationRecord
  has_one :plan_request
  has_one :internet_plan

  enums status: { pending: 0, approved: 1, rejected: 2, finished: 3 }
end
