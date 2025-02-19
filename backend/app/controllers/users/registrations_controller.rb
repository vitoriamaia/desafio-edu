# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if request.method == 'POST' && resource.persisted?
      puts "success"
      render json: { message: 'Cadastro com sucesso.', data: resource, user:@user }, status: :ok
    elsif request.method == 'DELETE'
      puts "delete"

      render json: { message: 'Conta deletada.' }, status: :ok
    else
      puts "unknow"

      render json: {
         message: "Usuário não pôde ser criado",
         errors: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end
end
