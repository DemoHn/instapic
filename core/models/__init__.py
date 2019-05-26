from flask_sqlalchemy import SQLAlchemy
from core.utils import import_all_submodules

db = SQLAlchemy()

def load_models(app):
  # import models dynamically
  # this is to avoid circular dependency
  import_all_submodules(__file__, __name__)
  
  db.init_app(app)
  db.create_all()