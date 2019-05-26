import os
from flask import Flask, jsonify

from .config import load_config
from .models import db, load_models
from .routes import load_routes

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    load_config(app)
    if test_config is not None:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs('data')
        os.makedirs('data/images')
    except OSError:
        pass

    with app.app_context():
        load_models(app)
        load_routes(app)

    return app