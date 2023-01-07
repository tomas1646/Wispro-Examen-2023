class InternetPlan < ApplicationRecord
  validates :description, :price, presence: true

  belongs_to :user

  def json
    {
      id:,
      description:,
      price:,
      user: user.name
    }
  end
end
