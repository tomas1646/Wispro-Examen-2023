class User < ApplicationRecord
  validates :username, :email, :password, :name, :type, presence: true
  validates :username, :email, uniqueness: true

  before_create :set_token

  def json
    { name:, username:, email:, type:, token: }
  end

  private

  def set_token
    self.token = SecureRandom.uuid
  end
end
