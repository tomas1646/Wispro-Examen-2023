class Isp < User
  has_many :internet_plans, foreign_key: :user_id
end
