class User < ApplicationRecord
  validates :username, :email, :password, :name, :type, presence: true
  validates :password, length: { minimum: 8 }
  validates :username, :email, uniqueness: true

  enum type: { Isp: 0, Client: 1 }

  before_create :set_token

  def json
    as_json(only: %i[name username type token])
  end

  private

  def set_token
    self.token = SecureRandom.uuid
  end
end
