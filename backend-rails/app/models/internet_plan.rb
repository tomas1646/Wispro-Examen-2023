class InternetPlan < ApplicationRecord
  validates :description, :price, presence: true

  belongs_to :user
end
