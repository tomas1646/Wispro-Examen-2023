class PlanRequestsController < ApplicationController
  before_action :set_plan_request, only: %i[show modify_plan accept reject]
  before_action :check_client_token, except: %i[show pending accept reject]
  before_action :check_isp_token, only: %i[pending accept reject]

  def show
    render_success_response(@plan_request.json, 'Plan Request fetched successfully')
  end

  def my_requests
    plan_requests = PlanRequest.where(user_id: @client.id)

    render_success_response(plan_requests.map(&:json), 'Plan Requests fetched successfully')
  end

  def pending
    plan_requests = PlanRequest.joins(request_details: :internet_plan)
                               .where('internet_plan.user_id' => @isp.id)
                               .and(PlanRequest.where(status: [0, 1]))

    render_success_response(plan_requests.map(&:json), 'Plan Requests fetched successfully')
  end

  def accept
    @plan_request.accept

    render_success_response(@plan_request.json, 'Plan Request accepted successfully')
  end

  def reject
    @plan_request.reject

    render_success_response(@plan_request.json, 'Plan Request rejected successfully')
  end

  def create
    plan_request = PlanRequest.new(user_id: @client.id)

    request_detail = RequestDetail.new(plan_request:, internet_plan_id: params[:internet_plan_id])

    plan_request.request_details.push(request_detail)

    if plan_request.save
      render_success_response(plan_request.json, 'Plan Request created successfully')
    else
      render_error_response(plan_request.errors,
                            "Error creating plan request. #{plan_request.errors.full_messages.join(', ')}")
    end
  end

  def update
    if @plan_request.update(internet_plan_params)
      render_success_response(@plan_request, 'Plan Request updated successfully')
    else
      render_error_response(@plan_request.errors,
                            "Error updating Plan Request. #{@plan_request.errors.full_messages.join(', ')}")
    end
  end

  def modify_plan
    request_detail = RequestDetail.new(internet_plan_id: params[:internet_plan_id])

    @plan_request.request_details.push(request_detail)
    @plan_request.status = :pendingModification

    if @plan_request.save
      render_success_response(@plan_request.json, 'Plan Request updated successfully')
    else
      render_error_response(request_detail.errors,
                            "Error updating Plan Request. #{request_detail.errors.full_messages.join(', ')}")
    end
  end

  private

  def internet_plan_params
    params.require(:plan_request).permit(:internet_plan_id)
  end

  def set_plan_request
    @plan_request = PlanRequest.find_by(id: params[:id])

    return if @plan_request.present?

    render_error_response({}, "Plan Request doesn't exists", 404)
  end

  def check_client_token
    @client = Client.find_by(token: request.headers['Authorization'].split(' ').last)

    return if @client.present?

    render_error_response({}, "Client with token #{request.headers['Authorization']} doesn't exists", 404)
  end

  def check_isp_token
    @isp = Isp.find_by(token: request.headers['Authorization'].split(' ').last)

    return if @isp.present?

    render_error_response({}, "Isp with token #{request.headers['Authorization']} doesn't exists", 404)
  end
end
