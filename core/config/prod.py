import os

def load_prod():
  return {
    '__env__': 'prod',
    'SECRET_KEY': os.environ['SECRET_KEY'],
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 125000,
    'USE_LOCAL_IMAGE_PROVIDER': True,
    # valid only if 'USE_LOCAL_IMAGE_PROVIDER' = True
    'LOCAL_IMAGE_DATADIR': 'data/images',
    'IMAGE_URL_PREFIX': 'images/',
    'MAX_CONTENT_LENGTH': 128 * 1024 * 1024, # 128M
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }
  