class Invoice < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :names, presence: true
  validates :prices, presence: true
  
end
