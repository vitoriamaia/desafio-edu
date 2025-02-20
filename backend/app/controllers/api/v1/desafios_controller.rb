require 'net/http'
require 'json'

module Api
  module V1
    class DesafiosController < ApplicationController
      before_action :authenticate_user!, only: %i[create update destroy ask_ai]
      before_action :set_desafio, only: %i[show update destroy]
      before_action :authorize_admin, only: %i[create update destroy ask_ai]

      # GET api/v1/desafios
      def index
        @desafios = Desafio.all
        render json: @desafios
      end

      # POST api/v1/desafios
      def create
        @desafio = current_user.desafios.build(desafios_params)
        if @desafio.save
          render json: { message: 'adicionado com sucesso', data: @desafio }
        else
          render json: { message: 'erro ao adicionar', data: @desafio.errors.full_messages }, status: unauthorized
        end
      end

      # GET /api/v1/desafios/:id
      def show
        if @desafio
          render json: { message: 'encontrado com sucesso', data: @desafio }
        else
          render json: { message: 'nao encontrado com sucesso', data: @desafio.errors }
        end
      end

      # PATCH/PUT api/v1/desafios/:id
      def update
        if @desafio.update(desafios_params)
          render json: { message: 'encontrado com sucesso', data: @desafio }
        else
          render json: { message: 'erro ao encontrar', data: @desafio.errors }
        end
      end

      # DELETE api/v1/desafios/:id
      def destroy
        if @desafio.destroy
          render json: { message: 'deletado com sucesso', data: @desafio }
        else
          render json: { message: 'erro ao deletar', data: @desafio.errors }
        end
      end

      # POST api/v1/desafios/ask_ai
      def ask_ai
        prompt = params[:question]
        response = call_openai(prompt)
        render json: { answer: response }
      end

      private

      def authorize_admin
        render json: { message: 'acao' } unless current_user.email == ENV['ADMIN_EMAIL']
      end

      def set_desafio
        @desafio = Desafio.find(params[:id])
      end

      def desafios_params
        params.require(:desafio).permit(:title, :description, :start_date, :end_date)
      end

      def call_openai(prompt)
        uri = URI("https://api.openai.com/v1/completions")
        req = Net::HTTP::Post.new(uri, {
          "Content-Type" => "application/json",
          "Authorization" => "Bearer #{ENV['OPENAI_API_KEY']}"
        })
        req.body = { model: "gpt-3.5-turbo", prompt: prompt, max_tokens: 100 }.to_json
        res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
        JSON.parse(res.body)["choices"].first["text"].strip
      end
    end
  end
end