import os
import logging

from flask import Flask, jsonify

from .config import load_config
from .models import db, load_models
from .routes import load_routes
from .errors import BaseException

logging.basicConfig(level=logging.DEBUG)

def create_app(test_config=None):
  # load logger
  logger = logging.getLogger(__name__)
  # create and configure the app
  app = Flask(__name__, instance_relative_config=True)

  load_config(app)
  if test_config is not None:
    # load the test config if passed in
    app.config.from_mapping(test_config)

  # ensure the instance folder exists
  try:
    os.makedirs(app.config['LOCAL_IMAGE_DATADIR'])
  except OSError:
    pass

  with app.app_context():
    load_models(app)
    load_routes(app)

  @app.errorhandler(BaseException)
  def handle_known_error(err):
    # log error stack for further debugging
    logger.exception(err)    
    response = jsonify(err.to_dict())
    response.status_code = err.status_code
    return response

  @app.errorhandler(Exception)
  def handle_unknown_error(err):
    # log error stack for further debugging
    logger.exception(err)

    response = jsonify(code=10000, message=str(err))
    response.status_code = 500
    return response
  return app