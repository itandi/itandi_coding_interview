module Api
  class ContractsController < ApplicationController
    def index
      @errors = []

      if params[:created_at_from].blank? || params[:created_at_to].blank?
        @errors << '検索期間を指定してください。'
      end

      if params[:created_at_from].present? && params[:created_at_to].present?
        if Time.zone.parse(params[:created_at_to]) - Time.zone.parse(params[:created_at_from]) > 1.year
          @errors << '検索期間は1年以内で指定してください。'
        end
      end


      return render json: { errors: @errors }, status: :bad_request if @errors.present?

      @contracts = current_user.contracts.where(created_at: Time.zone.parse(params[:created_at_from])..Time.zone.parse(params[:created_at_to]))
      @contracts = @contracts.where(status: params[:status]) if params[:status].present?

      render json: @contracts.map do |contract|
        {
          id: contract.id,
          document_path: contracts_pdf_path(contract),
          user_name: contract.user.name,
          status: contract.status,
          signers: contract.signers.map { |signer| { id: signer.id, name: signer.name } },
          created_at: contract.created_at,
          updated_at: contract.updated_at
        }
      end
    end

    def pdf
      @contract = Contract.find(params[:id])

      send_file @contract.document.file,
              type: 'application/pdf',
              disposition: 'inline',
              filename: "#{@contract.document.title}.pdf"
    end
  end
end
