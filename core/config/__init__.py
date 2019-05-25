import os
from .default import load_default
from .stag import load_stag
from .dev import load_dev
from .prod import load_prod

def load_config(app):
  # determine which config file should be loaded from FLASK_ENV setting
  flask_env = os.environ['FLASK_ENV']
  config_map = {
    'stag': load_stag,
    'prod': load_prod,
    'dev': load_dev,
  }
  # load default config
  default_config = load_default()
  dst_config = config_map[flask_env]()

  merge_config = {**default_config, **dst_config}
  
  app.config.from_mapping(merge_config)
