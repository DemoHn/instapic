import os

def load_prod():
  return {
    '__env__': 'prod',
    'SECRET_KEY': os.environ['SECRET_KEY'],
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 125000,
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }
  