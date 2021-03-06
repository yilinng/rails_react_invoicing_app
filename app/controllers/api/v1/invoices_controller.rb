class Api::V1::InvoicesController < ApplicationController
    before_action :authorized
    before_action :set_invoice, only: [:destroy, :show, :update]

    def index
        invoices = Invoice.all
        render json: invoices
    end

    def create
        #session[:user_id] = @user.id
        @invoice = Invoice.new(invoice_params)
        @invoice.user_id = session[:user_id]
        #invoice detail
        if @invoice.save         
            render json: {invoice: @invoice}, status: :created
        else
            render json: {transaction: @transaction.errors}, status: :unprocessable_entity
        end
      end

    def show
        #SELECT * FROM invoices LEFT JOIN transactions ON invoices.id=transactions.invoice_id WHERE invoice_id='${req.params.invoice_id}' ORDER BY transactions.id
        render json: { invoice: @invoice }
    end

    def update
        if @invoice.update(invoice_params)
            render json: {invoice: @invoice}, status: :ok
        else
            render json: {transaction: @transaction.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        if @invoice       
        @invoice.destroy
            render json: { message: 'delete success!!' }
        else
            render json: { message: 'delete fail, please try again' }, status: :unprocessable_entity 
        end
    end


    private

    def set_invoice
        @invoice = Invoice.find(params[:id])
    end

    def invoice_params
        params.permit(:name, :user_id, :names => [], :prices => [])
    end

end
