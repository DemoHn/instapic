from . import api, swag_from
from flask import jsonify, request, g
from core.services.user_service import (
  register_user,
  login_user,
  remove_token,
  get_user
)
from core.middlewares import auth

@api.route('/users/register', methods=['POST'])
@swag_from('specs/register.yml', validation=True)
def register():
  content = request.json  
  name = content['name']
  password = content['password']

  token = register_user(name, password)
  return jsonify(token=token)

@api.route('/users/login', methods=['POST'])
@swag_from('specs/login.yml', validation=True)
def login():
  content = request.json
  name = content['name']
  password = content['password']

  token = login_user(name, password)
  return jsonify(token=token)

@api.route('/users/logout', methods=['GET'])
@auth
@swag_from('specs/logout.yml', validation=False)
def logout():
  # return empty json value
  user_id = g.user_id
  if user_id:
    remove_token(user_id)
  return jsonify()

@api.route('/users', methods=['GET'])
@auth
@swag_from('sepec/get_user.yml', validation=False)
def get_user_ctrl():
  user_id = g.user_id
  return jsonify(get_user(user_id))