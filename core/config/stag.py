import os

def load_stag():
  return {
    '__env__': 'stag',
    'SECRET_KEY': os.environ['SECRET_KEY'],
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 1000,
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }