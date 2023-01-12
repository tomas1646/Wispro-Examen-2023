class Client < User
  has_many :plan_requests, foreign_key: :user_id
end
