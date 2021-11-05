class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.string :name
      t.integer :paid
      t.string :names, array: true, default: []
      t.integer :prices, array: true, default: []
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
