import os
from flask import Flask, jsonify

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATA_PATH='data',
        DATABASE=os.path.join('data', 'core.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
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