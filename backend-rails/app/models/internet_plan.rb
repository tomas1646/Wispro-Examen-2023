class InternetPlan < ApplicationRecord
  validates :description, :price, presence: true
  validates :price, numericality: { greater_than: 0 }

  belongs_to :user

  def json
    as_json(only: %i[id description price],
            include: { user: { only: %i[id name] } })
  end
end
