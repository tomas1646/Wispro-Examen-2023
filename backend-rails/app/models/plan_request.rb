class PlanRequest < ApplicationRecord
  belongs_to :user
  has_many :request_details
  has_many :internet_plans, through: :request_details

  enum status: { pending_approval: 0, pending_modification: 1, approved: 2, rejected: 3 }

  def json
    as_json(only: %i[id status created_at],
            include: { user: { only: %i[name] },
                       request_details: { only: %i[status created_at],
                                          include: { internet_plan: { only: %i[id description price],
                                                                      include: { user: { only: %i[name] } } } } } })
  end

  def accept
    raise "Plan is already #{status}" unless pending?

    request_details.find(&:approved?).update(status: :finished) if pending_modification?

    request_details.find(&:pending?).update(status: :approved)

    approved!
  end

  def reject
    raise "Plan is already #{status}" unless pending?

    # Reject a new plan request
    if pending_approval?
      request_details.first.update(status: :rejected)
      return rejected!
    end

    # Reject a plan modification
    request_details.find(&:pending?).update(status: :rejected)
    approved!
  end

  def modify_plan(internet_plan_id)
    raise "Plan is already #{status}. Cant request modification." unless approved?

    request_detail = RequestDetail.new(internet_plan_id:)

    request_details.push(request_detail)
    pending_modification!
  end

  private

  def pending?
    pending_approval? || pending_modification?
  end
end
