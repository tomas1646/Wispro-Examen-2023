class InternetPlansController < ApplicationController
  before_action :set_internet_plan, only: %i[update]
  before_action :check_token, except: %i[grouped_by_isp isp_plans_offered]

  def grouped_by_isp
    internet_plans = InternetPlan.preload(:user).all.group_by { |ip| ip.user.name }

    render_success_response(internet_plans, 'Internet plans fetched successfully')
  end

  def isp_plans
    internet_plans = InternetPlan.where(user: @isp)

    render_success_response(internet_plans, 'Internet plans fetched successfully')
  end

  def isp_plans_offered
    internet_plans = InternetPlan.ransack(user_name_eq: params[:isp]).result.includes(:user)

    render_success_response(internet_plans.map(&:json), 'Internet plans fetched successfully')
  end

  def create
    internet_plan = InternetPlan.new(internet_plan_params)

    internet_plan.user = @isp

    if internet_plan.save
      render_success_response(internet_plan, 'Internet plan created successfully')
    else
      render_error_response(internet_plan.errors,
                            "Error creating internet plan. #{internet_plan.errors.full_messages.join(', ')}")
    end
  end

  def update
    if @internet_plan.update(internet_plan_params)
      render_success_response(@internet_plan, 'Internet plan updated successfully')
    else
      render_error_response(@internet_plan.errors,
                            "Error updating internet plan. #{@internet_plan.errors.full_messages.join(', ')}")
    end
  end

  private

  def internet_plan_params
    params.require(:internet_plan).permit(:description, :price)
  end

  def set_internet_plan
    @internet_plan = InternetPlan.find_by(id: params[:id])

    return if @internet_plan.present?

    render_error_response({}, "Internet plan doesn't exists", 404)
  end

  def check_token
    @isp = Isp.find_by(token: request.headers['Authorization'].split(' ').last)

    return if @isp.present?

    render_error_response({}, "Isp with token #{request.headers['Authorization']} doesn't exists", 404)
  end
end
