import os

def load_dev():
  current_dir = os.getcwd()
  return {
    # How config loads:
    #   1. load DefaultConfig()
    #   2. check env, override DefaultConfig() from corresponding files
    #   3. those config (e.g. StagingConfig() ) will automatically load .env file to override their config
    '__env__': 'dev',
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///' + current_dir + '/data/db.sqlite',
  }


  