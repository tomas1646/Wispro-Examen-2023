class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render_success_response(user.json, 'User Created')
    else
      render_error_response({}, "Error creating User #{user.errors.full_messages.join(', ')}")
    end
  end

  def login
    user = User.find_by(username: params[:username])

    if user.blank? || user.password != params[:password]
      render_error_response({}, 'Incorrect Username or Password')
    else
      render_success_response(user.json, 'Login successful')
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :username, :email, :type)
  end
end
