class User < ApplicationRecord
    has_secure_password

    has_many :invoices, dependent: :destroy

    validates :email, presence: true, uniqueness: true
end
