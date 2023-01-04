class Isp < User
  has_many :internet_plans
  has_many :plan_requests, through: :internet_plans
end
