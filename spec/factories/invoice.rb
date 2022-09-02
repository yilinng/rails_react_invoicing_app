FactoryBot.define do
  factory :invoice do
    name { "2022/09/02 shop invoice" }
    user_id { 1 }
    names  { ["candy", "soda", "potato chips"] }
    prices { [70, 50, 35] }
  end
end