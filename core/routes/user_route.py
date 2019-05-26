from . import api

@api.route('/users/register')
def register():
  return 'OK'

@api.route('/users/login')
def login():
  return 'LOGIN'