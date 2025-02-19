# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { message: 'Logged com sucesso.', data: resource }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: { message: 'Saiu com sucesso' }, status: :ok
    else
      render json: { message: "Impossivel encontrar essa sessao" }, status: :unauthorized
    end
  end
end
