from . import api, swag_from
from flask import jsonify, request

@api.route('/users/register', methods=['POST'])
@swag_from('specs/register.yml', validation=True)
def register():
  content = request.json
  print(user_service.app)
  print(content['name'])
  return jsonify(name=content['name'])

@api.route('/users/login')
def login():
  return 'LOGIN'