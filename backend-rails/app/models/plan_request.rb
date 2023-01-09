class PlanRequest < ApplicationRecord
  belongs_to :user
  has_many :request_details
  has_many :internet_plans, through: :request_details

  enum status: { pendingApproval: 0, pendingModification: 1, approved: 2, rejected: 3, finished: 4 }

  def json
    {
      id:,
      status:,
      user: user.json,
      request_details: request_details.map(&:json),
      created_at:
    }
  end

  def accept
    raise "Plan is already #{status}" unless pending?

    request_details.find(&:approved?).update(status: :finished) if pendingModification?

    request_details.find(&:pending?).update(status: :approved)

    approved!
  end

  def reject
    raise "Plan is already #{status}" unless pending?

    # Reject a new plan request
    if pendingApproval?
      request_details.first.update(status: :rejected)
      return rejected!
    end

    # Reject a plan modification
    request_details.find(&:pending?).update(status: :rejected)
  end

  def pending?
    pendingApproval? || pendingModification?
  end
end
