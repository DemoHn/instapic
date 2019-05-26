import os

def load_dev():
  current_dir = os.getcwd()
  return {
    # How config loads:
    #   1. load DefaultConfig()
    #   2. check env, override DefaultConfig() from corresponding files
    #   3. those config (e.g. StagingConfig() ) will automatically load .env file to override their config
    '__env__': 'dev',
    'SECRET_KEY': '<secret>',
    # python pbkdf2 config
    'PBKDF2_ITERATION_TIMES': 1000,
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///' + current_dir + '/data/db.sqlite',
  }


  