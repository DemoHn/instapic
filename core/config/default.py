def load_default():
  # default config.
  # How config loads:
  #   1. load DefaultConfig()
  #   2. check env, override DefaultConfig() from corresponding files
  #   3. those config (e.g. StagingConfig() ) will automatically load .env file to override their config
  return {    
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///data/db.sqlite',
    'SECRET_KEY': '<secret>',
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 1000,
    'USE_LOCAL_IMAGE_PROVIDER': True,
    # valid only if 'USE_LOCAL_IMAGE_PROVIDER' = True
    'LOCAL_IMAGE_DATADIR': 'data/images',
    'IMAGE_URL_PREFIX': '/images/',
    'MAX_CONTENT_LENGTH': 32 * 1024 * 1024, # 32M
    'IMAGE_MAX_ITEMS': 4,
    'IMAGE_MIN_ITEMS': 1,
    'MAX_FETCH_LIMIT': 10,
    'MAX_DESCRIPTION_LENGTH': 200,
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
  }