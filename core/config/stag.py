import os

def load_stag():
  return {
    '__env__': 'stag',
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }