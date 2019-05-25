from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

import user
def load_models(app):  
  db.init_app(app)