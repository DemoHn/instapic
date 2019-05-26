def load_default():
  # default config.
  # How config loads:
  #   1. load DefaultConfig()
  #   2. check env, override DefaultConfig() from corresponding files
  #   3. those config (e.g. StagingConfig() ) will automatically load .env file to override their config
  return {    
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///data/db.sqlite',
    'SECRET_KEY': '<secret>',
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,    
  }