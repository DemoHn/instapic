import os
from flask import Flask, jsonify
from .config import load_config

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

    # a simple page for health checking
    @app.route('/healthz')
    def hello():
        return jsonify(status='OK')

    return app