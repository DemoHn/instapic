from . import api, swag_from
from flask import jsonify, request
from core.services.user_service import (
  register,
  login,
  remove_token
)

@api.route('/users/register', methods=['POST'])
@swag_from('specs/register.yml', validation=True)
def register():
  content = request.json
  name = content['name']
  password = content['password']

  token = register(name, password)
  return jsonify(token=token)

@api.route('/users/login', methods=['POST'])
@swag_from('specs/login.yml', validation=True)
def login():
  content = request.json
  name = content['name']
  password = content['password']

  token = login(name, password)
  return jsonify(token=token)

@api.route('/users/logout', methods=['GET'])
@swag_from('specs/logout.yml', validation=False)
def logout():
  # return empty json value
  user_id = None # TODO
  if user_id:
    remove_token(user_id)
  return jsonify()