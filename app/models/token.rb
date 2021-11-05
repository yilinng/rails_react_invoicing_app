class Token < ApplicationRecord
  
  validates :user_login, presence: true, uniqueness: true

end
