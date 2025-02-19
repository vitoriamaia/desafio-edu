require 'rack'
app = Rack::Directory.new(Dir.pwd)
run app
