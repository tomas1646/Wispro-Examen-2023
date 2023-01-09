class InternetPlan < ApplicationRecord
  validates :description, :price, presence: true

  belongs_to :user

  def json
    as_json(only: %i[id description price],
            include: { user: { only: %i[name] } })
  end
end
