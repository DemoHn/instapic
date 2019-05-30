from core.models import db
from core.models.user import User
from core.models.user_session import UserSession
from core.errors import (
  SQLExecutionException,
  UserNotFoundException,
  WrongPasswordException
)
from flask import current_app as app
from pbkdf2 import crypt
import time
import os
import base58
import random
import hashlib



def register_user(name, password):
  password_hash = generate_hash(password)
  # prepare user data
  new_user = User(
    name=name,
    password_hash=password_hash
  )

  try:
    db.session.add(new_user)
    db.session.commit()
  except Exception as e:
    raise SQLExecutionException('new user')
  # generate & insert user token  
  token = generate_random_token()
  new_session = UserSession(
    user_id=new_user.id,
    token=token
  )
  
  try:
    # new session token
    db.session.add(new_session)
    db.session.commit()
  except Exception as e:
    raise SQLExecutionException('new session')
  return token

def login_user(name, password):
  # find user
  user = db.session.query(User).filter_by(name=name).first()
  if user == None:
    raise UserNotFoundException('user not exists')

  # verify password
  if verify_hash(password, user.password_hash) == False:
    raise WrongPasswordException('wrong password')    

  # if verified
  token = generate_random_token()
  # find the corresponded user_session
  user_session = db.session.query(UserSession).filter_by(user_id=user.id).first()
  if user_session == None:
    # insert session if not found
    db.session.add(UserSession(
      user_id=user.id,
      token=token
    ))
    db.session.commit()
  else:
    # update session
    user_session.token = token
    db.session.commit()
  
  return token

def remove_token(user_id):
  db.session.query(UserSession).filter_by(user_id=user_id).delete()
  db.session.commit()
  
# private functions (helpers)
def generate_hash(password):
  iterations = app.config['PBKDF2_ITERATION_TIMES']

  salt = base58.b58encode(os.urandom(16))
  return crypt(password, salt=salt, iterations=iterations)

def verify_hash(password, db_hash):
  # according to the doc, it *does* use like that
  # quite confusing...
  return db_hash == crypt(password, db_hash)

def generate_random_token():
  secret_key = app.config['SECRET_KEY']
  millis = int(round(time.time() * 1000))
  raw_str = '%s:%d:%d:%d' % (secret_key, millis, random.randint(1, 1e4), random.randint(1, 1e4))

  return hashlib.sha256(raw_str.encode()).hexdigest()  
