import os

def load_prod():
  return {
    '__env__': 'prod',
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }
  