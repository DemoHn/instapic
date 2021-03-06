import os

def load_stag():
  return {
    '__env__': 'stag',
    'SECRET_KEY': os.environ['SECRET_KEY'],
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 1000,
    'USE_LOCAL_IMAGE_PROVIDER': True,
    # valid only if 'USE_LOCAL_IMAGE_PROVIDER' = True
    'LOCAL_IMAGE_DATADIR': 'data/images',
    'IMAGE_URL_PREFIX': '/images/',
    'MAX_CONTENT_LENGTH': 12 * 1024 * 1024, # 12M
    'IMAGE_MAX_ITEMS': 4,
    'IMAGE_MIN_ITEMS': 1,
    'MAX_FETCH_LIMIT': 10,
    'MAX_DESCRIPTION_LENGTH': 100,
    'SQLALCHEMY_DATABASE_URI': os.environ['DATABASE_URI']
  }